import { ReactNode } from 'react';
import ReactQueryProvider from '@/app/providers/react-query-provider';

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
