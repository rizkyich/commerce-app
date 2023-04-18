import React from 'react';
import clsx from 'clsx';

import { PreloadProvider } from '@/context/PreloadContext';

import Header from './Header';
import HeroSection from '../HeroSection';
import CategoryMenu from './CategoryMenu';
import { CategoryType } from '@/types/categoryTypes';

type LayoutProps = {
  children: React.ReactNode;
  isShowHeroSection?: boolean;
  categories: CategoryType[];
}

export default function Layout({
  children,
  isShowHeroSection = false,
  categories,
}: LayoutProps) {
  return (
    <>
      <Header/>
      <PreloadProvider>
        <main className={clsx(
          'w-full container mx-auto',
          'mt-16'
        )}>
          <div className='px-0 lg:px-5 py-5 flex gap-8'>
            <CategoryMenu categories={categories}/>
            <div
              className='w-full min-h-[calc(100vh+200px)]'
            >
              {children}
            </div>
          </div>
        </main>
      </PreloadProvider>
    </>
  )
}
