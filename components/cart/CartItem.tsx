import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { Product } from "models/Product";
import { Builder } from "models/Builder";
import Image from "next/image";

import ALTimage from "public/images/ALTimage.png";
import minus from "public/images/-.svg";
import plus from "public/images/+.svg";

type Prop = {
  item: {
    product: (Product | Builder) & { _id: string };
    quantity: number;
  };
  selected?: Boolean;
};

const CartItem = ({ item, selected }: Prop) => {
  const { addQuantity, removeQuantity, removeContent } =
    useContext(CartContext);

  return (
    <div className="flex">
      <div id="product-checkbox" className="m-4">
        <input
          className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-orange-500 rounded-sm"
          type="checkbox"
          value=""
        />
      </div>
      <div id="product-image" className="ml-2 my-3 mx-6">
        <Image
          className="rounded-lg"
          src={
            ALTimage
          }
        />
      </div>
      <div id="product-details" className="ml-2 my-3 mx-6">
        <div id="product-name">
          <p className="font-semibold text-gray-50">
            {
              // @ts-expect-error
              item.product.name || `${item.product.baseKeyboard.name} (Builder)`
            }
          </p>
        </div>
        <div id="product-desc">
          <p className="text-xs font-basic text-manatee-500">
            Space Gray / Barebone
          </p>
        </div>
        <div
          id="product-quantity"
          className="mt-2 border-2 w-3/5 flex border-gray-50 justify-around items-center"
        >
          <button
            className="rounded-lg flex items-center p-2"
            disabled={item.quantity === 1}
            onClick={() => {
              removeQuantity(item.product);
            }}
          >
            <Image src={minus} />
          </button>
          <p className="text-sm font-semibold text-gray-50 text-center">
            {item.quantity}
          </p>
          <button
            className="rounded-lg flex items-center p-2"
            onClick={() => {
              addQuantity(item.product);
            }}
          >
            <Image className="rounded-lg" src={plus} />
          </button>
        </div>
      </div>
      <div id="product-removenprice" className="ml-96 my-3 mx-6">
        <button
          onClick={() => {
            removeContent(item.product);
          }}
          className="underline font-semibold text-yellow-500"
        >
          Remove
        </button>
        <p className="mt-5 text-lg font-basic text-gray-50">
          Rp
          {/* prettier-ignore */
          // @ts-expect-error
          (item.product.basePrice || item.product.totalPrice) * item.quantity.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
