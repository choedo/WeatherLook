import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

type State = { selected: number };
const initialState: State = {
  selected: 1,
};

const useSelectDayStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSelected: (key: number) => set({ selected: key }),
      },
    })),
    { name: 'SelectDayStore' },
  ),
);

export const useSelectDay = () => {
  return useSelectDayStore();
};

export const useGetSelectDay = () => {
  const selected = useSelectDayStore((store) => store.selected);
  return selected;
};

export const useSetSelectDay = () => {
  const setSelected = useSelectDayStore((store) => store.actions.setSelected);
  return setSelected;
};
