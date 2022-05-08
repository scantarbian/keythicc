import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
// components
import Image from "next/image";
import Arrow from "public/images/Arrow.png";
import Link from "next/link";

type Props = {
  className?: string;
  displayOnly?: boolean;
};

const PriceInfo = ({ className, displayOnly = false }: Props) => {
  const {
    contents,
    getTotalPrice,
    getTotalQuantity,
    getTotalPriceWithShipping,
    provider,
  } = useContext(CartContext);

  return (
    <div
      className={`gap-4 flex flex-col w-full bg-shark-500 self-start ${className}`}
    >
      <div className="flex bg-tuatara-500 rounded border-2 border-colonialwhite-500 ">
        <h2 className="p-2 text-sm font-basic text-colonialwhite-500">
          Use Coupon Code or KeyThicc Points
        </h2>
        <Image className="m-10" src={Arrow} />
      </div>
      {!displayOnly && (
        <h2 className=" text-2xl font-semibold text-gray-50">Summary</h2>
      )}
      <div className="flex justify-between">
        <p className=" text-lg font-light text-gray-50">
          item price ({getTotalQuantity()} items)
        </p>
        <p className=" text-lg font-light text-gray-50">
          Rp{getTotalPrice().toLocaleString()}
        </p>
      </div>
      <div className="flex justify-between">
        <p className=" text-lg font-light text-manatee-500">
          Total item discount
        </p>
        <p className="text-lg font-light text-manatee-500">-$22.50</p>
      </div>
      {provider?.final_price && (
        <div className="flex justify-between">
          <p className=" text-lg font-light text-gray-50">Shipping</p>
          <p className=" text-lg font-light text-gray-50">
            Rp{provider.final_price.toLocaleString()}
          </p>
        </div>
      )}

      <hr className="w-full bg-manatee-500" />

      <div className="flex justify-between">
        <p className=" text-lg font-light text-gray-50">Total Price</p>
        <p className="text-lg font-light text-gray-50">
          Rp{getTotalPriceWithShipping().toLocaleString()}
        </p>
      </div>
      {!displayOnly && (
        <Link href="/cart/checkout">
          <button
            className={`text-center text-lg font-semibold text-black w-full p-4  ${
              contents.length === 0
                ? "opacity-50 cursor-not-allowed bg-gray-500"
                : "bg-yellow-500 "
            }`}
            disabled={contents.length === 0}
          >
            CHECKOUT
          </button>
        </Link>
      )}
    </div>
  );
};

export default PriceInfo;
