import React from 'react';
import clsx from 'clsx';

import Header from './Header';
import { PreloadProvider } from '@/context/PreloadContext';

type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <PreloadProvider>
        <main className={clsx(
          'w-full',
          'mt-16'
        )}>
          <div className='container mx-auto px-5 py-5'>
            {children}
          </div>
        </main>
      </PreloadProvider>
    </>
  )
}
