import React, { useEffect, useState }  from 'react'
import clsx from 'clsx';
import Link from 'next/link';

import { getCategoryList } from '@/services/category';
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
        ' w-52 top-0',
        'hidden md:flex flex-col',
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
