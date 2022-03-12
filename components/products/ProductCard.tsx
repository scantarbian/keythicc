import Image from "next/image";
import { Product } from "models/Product";

type ProductCardProps = {
  product: Product & { _id: string };
  className?: string;
};

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={`flex flex-col p-6 ${className}`}
      style={{
        backgroundColor: "#1F1F1F",
      }}
    >
      <div>{/* <Image src={product.image[0]} /> */}</div>
      <span className="text-2xl font-bold">{product.name}</span>
      <span>Rp{product.basePrice.toLocaleString()}</span>
    </div>
  );
};

export default ProductCard;
