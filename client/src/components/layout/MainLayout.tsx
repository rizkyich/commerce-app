import React from 'react'

import Header from '../Header'

type MainLayoutProps = {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='w-screen min-h-screen'>
      <Header/>
      {children}
    </div>
  )
}
