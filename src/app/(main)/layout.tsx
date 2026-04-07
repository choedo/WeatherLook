import Header from '@/components/layout/header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={'max-w-7xl w-full mx-auto'}>
      <Header />
      <main className={'py-4 w-full'}>{children}</main>
    </div>
  );
}
