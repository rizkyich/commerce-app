import React from 'react'

type MainLayoutProps = {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='w-screen min-h-screen'>
      {children}
    </div>
  )
}
