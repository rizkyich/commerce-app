import React from 'react'
import clsx from 'clsx'
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"

function HeroSection() {
  return (
    <section className={clsx(
      'h-[calc(100vh-4rem)] grid grid-rows-4 grid-cols-4 py-5 grid-flow-col md:gap-2 lg:gap-4'
    )}>
      <div className={clsx(
        'bg-majorelle-blue row-span-2 col-span-2',
        'md:row-span-3 md:col-span-2'
      )}></div>
        <div className=' bg-red-400 row-span-2 col-span-4 md:col-span-2'></div>
      <div className={clsx(
        'bg-majorelle-blue md:row-span-1 md:col-span-2',
        'row-span-2 col-span-2'
        )}></div>
      <div className={clsx(
        'bg-majorelle-blue row-span-1 col-span-3 row-start-4 col-start-1',
        'hidden md:block'
      )}></div>
      <div className={clsx(
        'bg-majorelle-blue row-span-1 col-span-1 row-start-4 col-start-4',
        'hidden md:grid items-center justify-center',
      )}>
        <ArrowDownCircleIcon
          className='w-20 text-white bg-majorelle-blue'
        />
      </div>
    </section>
  )
}

export default HeroSection