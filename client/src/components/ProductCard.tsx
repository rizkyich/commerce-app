import { ProductType } from "@/types/productTypes"

type ProductCardProps = {
  product: ProductType;
}

export default function ProductCard({
  product
}: ProductCardProps) {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  )
}