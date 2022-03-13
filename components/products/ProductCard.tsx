import Image from "next/image";
import { Product } from "models/Product";
import { Image as Img } from "models/Image";
import Placeholder from "public/images/placeholder.jpg";

type ProductCardProps = {
  product: Product & { _id: string; image: [Img & { _id: string }] };
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
      <div className="h-48 w-full flex flex-col justify-center relative z-0">
        {product.image.length > 0 ? (
          <>
            <Image
              src={product.image[0].path}
              width={product.image[0].width}
              height={product.image[0].height}
            />
            <div className="absolute z-10">
              <Image
                src={product.image[1].path}
                width={product.image[1].width}
                height={product.image[1].height}
              />
            </div>
          </>
        ) : (
          <Image src={Placeholder} />
        )}
      </div>
      <span className="text-2xl font-bold">{product.name}</span>
      <span>Rp{product.basePrice.toLocaleString()}</span>
    </div>
  );
};

export default ProductCard;
