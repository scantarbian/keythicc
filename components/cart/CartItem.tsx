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
    selected: boolean;
  };
  displayOnly?: boolean;
  className?: string;
};

const CartItem = ({ item, displayOnly = false, className }: Prop) => {
  const { addQuantity, removeQuantity, removeContent, toggleSelect } =
    useContext(CartContext);

  return (
    <div className={`flex items-center p-4 gap-x-4 ${className}`}>
      {!displayOnly && (
        <input
          className="form-check-input m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-orange-500 rounded-sm"
          type="checkbox"
          checked={item.selected}
          onChange={() => toggleSelect(item.product)}
        />
      )}

      <Image className="rounded-lg" src={ALTimage} />

      <div className="flex-1">
        <p className="font-semibold text-gray-50">
          {
            // @ts-expect-error
            item.product.name || `${item.product.baseKeyboard.name} (Builder)`
          }
        </p>

        <p className="text-xs font-basic text-manatee-500">
          Space Gray / Barebone
        </p>

        {displayOnly ? (
          <span className="text-white">{`${item.quantity} ${
            item.quantity > 1 ? "items" : "item"
          }`}</span>
        ) : (
          <div className="mt-2 border-2 w-20 flex border-gray-50 justify-around items-center">
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
        )}
      </div>
      <div className="flex flex-col justify-between items-end">
        {!displayOnly && (
          <button
            onClick={() => {
              removeContent(item.product);
            }}
            className="underline font-semibold text-yellow-500"
          >
            Remove
          </button>
        )}
        <p className="text-lg font-basic text-gray-50">
          Rp
          {
            /* prettier-ignore */
            // @ts-expect-error
            (item.product.basePrice || item.product.totalPrice) * item.quantity.toLocaleString()
          }
        </p>
      </div>
    </div>
  );
};

export default CartItem;
