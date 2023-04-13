import React, { useEffect, useState } from 'react'

import CategoryMenu from './CategoryMenu'

import { getProductList } from '@/services/products';
import { ProductType } from '@/types/productTypes';
import { CategoryType } from '@/types/categoryTypes';
import ProductCard from './ProductCard';

type CatalogSectionProps = {
  categories: CategoryType[];
  products: ProductType[];
}

function CatalogSection({
  categories,
  products,
}: CatalogSectionProps) {

  return (
    <section className='flex gap-12 min-h-screen my-4'>
      <CategoryMenu categories={categories}/>
      <div className='w-full'>
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
