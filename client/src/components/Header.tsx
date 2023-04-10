import clsx from "clsx"
import SearchBar from "./SearchBar"

export default function Header() {
  return (
    <header className={clsx(
      "w-full h-16 bg-chinese-black backdrop-blur shadow-sm",
      "px-14 py-2",
      "flex justify-between items-center"
    )}>
    </header>
  )
}