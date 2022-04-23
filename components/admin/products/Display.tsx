import { Product } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";
import { Image as Img } from "models/Image";
import { NextRouter } from "next/router";
// components
import Image from "next/image";
import EditMode from "./EditMode";

const ProductDisplay = ({
  product,
  types,
  categories,
  editMode,
  setEditMode,
  router,
  baseKeycaps,
  baseSwitches,
}: {
  product: Product & {
    _id: string;
    image: [Img & { _id: string }];
    type: Type & {
      _id: string;
    };
    baseKeycaps?: Product & { _id: string };
    baseSwitches?: Product & { _id: string };
  };
  types: [Type & { _id: string }];
  categories: [Category & { _id: string }];
  baseKeycaps?: Array<Product & { _id: string }>;
  baseSwitches?: Array<Product & { _id: string }>;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  router: NextRouter;
}) => {
  const data = [
    {
      name: "Type",
      value: product.type.name,
    },
    {
      name: "Category",
      value: categories.find(
        (category) => category._id === String(product.category)
      )?.name,
    },
    {
      name: "Price",
      value: `Rp.${product.basePrice?.toLocaleString()}`,
    },
    {
      name: "Stock",
      value: `${product.stock?.toLocaleString()}`,
    },
    {
      name: "Footnotes",
      value: product.footnote,
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="w-1/3 flex flex-col items-center">
        {product.image?.length > 0 &&
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
        {editMode ? (
          <EditMode
            product={product}
            types={types}
            categories={categories}
            setEditMode={setEditMode}
            router={router}
            baseKeycaps={baseKeycaps}
            baseSwitches={baseSwitches}
          />
        ) : (
          <>
            <div className="grid grid-cols-2 w-1/2 gap-y-2">
              <span className="font-bold">Name</span>
              <span>{product.name}</span>
            </div>
            <div className="flex flex-col w-1/2 ">
              <span className="font-bold">Description:</span>
              <span>{product.description}</span>
            </div>
            <div className="flex flex-col gap-y-2 w-1/2">
              {data.map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <span className="font-bold">{item.name}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
