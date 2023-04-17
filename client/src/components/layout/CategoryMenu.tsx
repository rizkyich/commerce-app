import React  from 'react'
import clsx from 'clsx';
import Link from 'next/link';

import { CategoryType } from '@/types/categoryTypes';


type CategoryMenuProps = {
  categories: CategoryType[]
}

function CategoryMenu({
  categories
}: CategoryMenuProps) {
  return (
    <aside
      className={clsx(
        'sticky w-full max-w-[245px] top-[5rem] z-10 overflow-y-auto h-auto',
        'self-start'
      )}
    >
      <ul>
        {
          categories?.map((item: CategoryType) => {
            return (
              <li
                key={item.id}
                className='my-2'
              >
                <Link
                  href={`/category/${item.id}`}
                  className='text-chinese-black text-[22px] font-semibold'
                >
                  {item.name}
                </Link>
              </li>
            )
          })

        }
          <span className='block w-full border-b-2 my-6 border-majorelle-blue'/>
          <li>
            <Link
              href='/category/all'
              className='text-chinese-black text-[22px] font-semibold'
            >
              View All
            </Link>
          </li>
      </ul>
    </aside>
  )
}

export default CategoryMenu;
// position: sticky;
// top: 94px;
// z-index: 1;
// display: block;
// min-width: 316px;
// max-height: calc(100vh - 118px);
// margin-right: 32px;
// border: 1px solid rgba(198, 198, 198, 0.6);
// border-radius: 4px;
// overflow-y: auto;