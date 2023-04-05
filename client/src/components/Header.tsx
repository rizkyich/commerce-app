import clsx from "clsx"

export default function Header() {
  return (
    <header className={clsx(
      "w-full h-14 bg-cultured backdrop-blur shadow-sm",
      "px-14 py-2",
      "flex justify-between items-center"
    )}>
    </header>
  )
}