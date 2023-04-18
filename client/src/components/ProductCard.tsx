import Image from 'next/image';
import clsx from 'clsx';

import thousandSeparators from '@/helpers/tousandSeparators';

import { ProductType } from '@/types/productTypes';

type ProductCardProps = {
  product: ProductType;
}

export default function ProductCard({
  product
}: ProductCardProps) {
  const priceString = `IDR ${thousandSeparators(product.price)}`

  return (
    <div
      className={clsx(
        'relative w-[300px] h-[450px] shadow-md',
        'rounded-md mx-auto'
      )}
    >
      <div className='relative w-[300px] h-[300px] rounded-md'>
        <Image
          fill
          src={product.imageUrl}
          alt={product.name}
          style={{objectFit: 'cover', borderRadius: '.375rem .375rem 0 0'}}
        />
      </div>

      <div className='flex flex-col py-8 p-5'>
        <h3 className='text-xl mb-1 text-chinese-black'>{product.name}</h3>
        
        <p className='text-lg text-chinese-black'>{priceString}</p>
      
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