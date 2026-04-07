import { Region, REGIONS } from '@/constants/regions';
import { create } from 'zustand';
import {
  combine,
  devtools,
  persist,
  createJSONStorage,
} from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

type State = Region & { x: number; y: number; lat: number; lng: number };
const initialState: State = {
  ...REGIONS['seoul'],
  x: 60,
  y: 60,
  lat: 37.5664,
  lng: 126.9778,
};

const useLocationStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setLocation: (value: State) => set({ ...value }),
        },
      })),
      {
        name: 'LocationStore',
        storage: createJSONStorage(() => localStorage),
        partialize: (store) => {
          const { actions, ...rest } = store;
          return rest;
        },
      },
    ),
    { name: 'LocationStore' },
  ),
);

export const useLocation = () => {
  const store = useLocationStore((store) => store);

  return store;
};

export const useLocationInformation = () => {
  return useLocationStore(
    useShallow((store) => ({
      name: store.name,
      path: store.path,
      x: store.x,
      y: store.y,
      nx: store.nx,
      ny: store.ny,
      taRegId: store.taRegId,
      landRegId: store.landRegId,
      lat: store.lat,
      lng: store.lng,
    })),
  );
};

export const useSetLocation = () => {
  const setLocation = useLocationStore((store) => store.actions.setLocation);
  return setLocation;
};
