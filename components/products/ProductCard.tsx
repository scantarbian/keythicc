import Image from "next/image";
import { Product } from "models/Product";
import { Type } from "models/Type";
import { Image as Img } from "models/Image";
import Placeholder from "public/images/placeholder.jpg";
import Link from "next/link";

type ProductCardProps = {
  product: Product & {
    _id: string;
    image: [Img & { _id: string }];
    type: Type;
  };
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
            {product.type.name === "Keyboard" && (
              <div className="absolute z-10">
                <Image
                  src={product.image[1].path}
                  width={product.image[1].width}
                  height={product.image[1].height}
                />
              </div>
            )}
          </>
        ) : (
          <Image src={Placeholder} />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold">{product.name}</span>
        {product.material && (
          <span className="text-lg">Material: {product.material}</span>
        )}
        <span>
          Rp{product.basePrice.toLocaleString()}
          {product.type.name === "Keycaps" ? " / pc" : ""}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
