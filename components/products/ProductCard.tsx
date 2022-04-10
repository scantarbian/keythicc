import Image from "next/image";
import { Product } from "models/Product";
import { Type } from "models/Type";
import { Image as Img } from "models/Image";
import Placeholder from "public/images/placeholder.jpg";
import Link from "next/link";

export interface ProductProps extends Product {
  _id: string;
  image: Array<Img & { _id: string }>;
  type: Type;
}

type ProductCardProps = {
  product: ProductProps;
  className?: string;
};

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div className={`flex flex-col p-6 bg-special-grey ${className}`}>
      <div className="h-48 w-full flex flex-col justify-center relative z-0 ">
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
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-2xl font-bold">{product.name}</span>
        {product.type.name === "Keycaps" && (
          <span className="text-lg">Material: {product.material}</span>
        )}
        {product.type.name === "Switches" && (
          <>
            <span className="text-lg">
              Actuation Distance: {product.actuationDistance} mm
            </span>
            <span className="text-lg">
              Actuation Force: {product.actuationForce} cN
            </span>
          </>
        )}
        <span>
          Rp{product.basePrice.toLocaleString()}
          {product.type.name === "Switches" ? " / pc" : ""}
        </span>
        {product.customizable ? (
          <Link href={`/builder/${product._id}`}>
            <a className="text-lg text-white text-center bg-orange-400 p-2 mt-4 hover:bg-gray-700 hover:text-orange-400">
              <span className="font-bold">Build It!</span>
            </a>
          </Link>
        ) : (
          <button className="text-lg text-white text-center bg-orange-400 p-2 mt-4 hover:bg-gray-700 hover:text-orange-400">
            <span className="font-bold">Add to Cart!</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
