import React, { useEffect, useState } from 'react'
import clsx from 'clsx';

import { ProductType } from '@/types/productTypes';
import ProductCard from './ProductCard';
import { getProductList } from '@/services/products';

type CatalogSectionProps = {
  categoryId?: string;
}

function CatalogSection({
  categoryId,
}: CatalogSectionProps) {
  const [products, setProducts] = useState<ProductType[]>();

  const fetchProducts = async (id?: string) => {
    try {
      const productsResponse = await getProductList({
        categoryId: id,
        pageInfo: {
          itemsPerPage: 10,
          currentPage: 1,
        }
      });

      setProducts(productsResponse.products)     
    } catch(error) {
      console.error({error})
    }
  }

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId])

  return (
    <section className='w-full flex gap-10 min-h-screen my-4'>
      <div className={clsx(
        'w-full grid gap-y-10 gap-x-6',
        'md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      )}>
      {
          products?.map((product: ProductType) => {
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
