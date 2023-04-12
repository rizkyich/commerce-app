import React from 'react'

import CategoryMenu from './CategoryMenu'
import useLoaded from '@/hooks/useLoaded';

function CatalogSection() {
  return (
    <section className='flex gap-8 min-h-screen'>
      <CategoryMenu/>
    </section>
  )
}

export default CatalogSection;
