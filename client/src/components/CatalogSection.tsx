import React, { useEffect, useState } from 'react'

import CategoryMenu from './layout/CategoryMenu'

import { ProductType } from '@/types/productTypes';
import { CategoryType } from '@/types/categoryTypes';
import ProductCard from './ProductCard';

type CatalogSectionProps = {
  products: ProductType[];
}

function CatalogSection({
  products,
}: CatalogSectionProps) {

  return (
    <section className='flex gap-12 min-h-screen my-4'>
      <div className='w-full flex flex-wrap gap-8'>
        {
          products.map((product: ProductType) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default CatalogSection;
