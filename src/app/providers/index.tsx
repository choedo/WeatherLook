import { ReactNode } from 'react';
import ReactQueryProvider from '@/app/providers/ReactQueryProvider';

type Props = { children: ReactNode };
export default function Providers({ children }: Props) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
