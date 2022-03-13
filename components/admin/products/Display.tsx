import { Product } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";
import { Image as Img } from "models/Image";
// components
import Image from "next/image";

const ProductDisplay = ({
  product,
  types,
  categories,
  editMode,
  setEditMode,
}: {
  product: Product & { _id: string; image: [Img & { _id: string }] };
  types: [Type & { _id: string }];
  categories: [Category & { _id: string }];
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}) => {
  const data = [
    {
      name: "Type",
      value: types.find((type) => type._id === String(product.type))?.name,
    },
    {
      name: "Category",
      value: categories.find(
        (category) => category._id === String(product.category)
      )?.name,
    },
    {
      name: "Price",
      value: `Rp.${product.basePrice.toLocaleString()}`,
    },
    {
      name: "Stock",
      value: `${product.stock.toLocaleString()}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">{product.name}</span>
      <div className="flex">
        <div className="w-1/3 flex flex-col items-center">
          {product.image.length > 0 &&
            product.image.map((image: Img & { _id: string }) => (
              <Image
                key={image._id}
                src={image.path}
                width={image.width}
                height={image.height}
              />
            ))}
        </div>
        <div className="w-2/3 flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="font-bold">Description:</span>
            <span>{product.description}</span>
          </div>
          <div className="grid grid-cols-2 w-1/2 gap-y-2">
            {data.map((item) => (
              <>
                <span className="font-bold">{item.name}</span>
                <span>{item.value}</span>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
