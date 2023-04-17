import Image from 'next/image';
import clsx from 'clsx';

import { ProductType } from '@/types/productTypes';

type ProductCardProps = {
  product: ProductType;
}

export default function ProductCard({
  product
}: ProductCardProps) {
  return (
    <div
      className={clsx(
        'relative w-[350px] h-[450px] shadow-md',
        'rounded-md'
      )}
    >
      <div className='relative w-[350px] h-[300px] rounded-md'>
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          style={{objectFit: 'cover', borderRadius: '.375rem .375rem 0 0'}}
        />
      </div>

      <div className='flex flex-col py-8 p-5'>
        <h3 className='text-xl mx-auto mb-3 text-chinese-black'>{product.name}</h3>
        
        <p>Price: {product.price}</p>
      
      </div>


      <button
        className={clsx(
          'absolute w-10/12 bottom-[-1rem] right-0 left-0 mx-auto px-4 py-3',
          'bg-majorelle-blue text-cultured',
          'shadow-md shadow-majorelle-blue'
        )}
      >
        Add to Cart
      </button>
    </div>
  )
}