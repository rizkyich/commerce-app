import clsx from 'clsx'

export default function Header() {
  return (
    <header className={clsx(
      'fixed top-0 left-0 z-50',
      'w-full h-16',
      'px-14 py-2 border-b-[1px] border-gray-silver',
      'flex justify-between items-center',
      'backdrop-blur hover:backdrop-blur-none hover:bg-cultured',
      'transition ease-out duration-300'
    )}>
    </header>
  )
}