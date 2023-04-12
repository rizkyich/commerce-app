import React  from 'react'
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';


const DUMMY_CATEGORIES = ["Analog", "DIGITAL", "FILM ROLL"]

function CategoryMenu() {
  return (
    <aside
      className={clsx(
        'w-24 top-0 flex flex-col',
      )}
    >
      <ul>
        {
          DUMMY_CATEGORIES.map((item: string, index: number) => {
            return (
              <li key={index}>
                {item}
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}

export default CategoryMenu;
