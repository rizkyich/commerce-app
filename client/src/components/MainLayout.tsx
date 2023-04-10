import React from 'react';
import clsx from 'clsx';

import Header from './Header';

type MainLayoutProps = {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='w-screen min-h-screen'>
      <Header/>
      <main className={clsx(
        'w-full',
        'px-0 md:px-14 lg:px-60'
      )}>
        {children}
      </main>
    </div>
  )
}
