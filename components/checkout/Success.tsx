import { useContext } from "react";
import { useRouter } from "next/router";
// context
import { CartContext } from "contexts/CartContext";

type Props = {
  className?: string;
};

const Success = ({ className }: Props) => {
  const { orderId, shipper } = useContext(CartContext);
  const router = useRouter();

  return (
    <div className={`flex flex-col items-center text-white ${className}`}>
      <span className="text-3xl font-bold">Transcation Success</span>
      <span>Thank you for your order!</span>
      <div className="p-2 mt-4 border-2 border-yellow-500 rounded-lg divide-y">
        <div className="grid grid-cols-3 p-2">
          <span>Order ID</span>
          <span className="col-span-2">{orderId}</span>
        </div>
        {/* <div className="grid grid-cols-3 p-2">
          <span>Shipping ID</span>
          <span className="col-span-2">{orderId}</span>
        </div>
        <div className="grid grid-cols-3 p-2">
          <span>Transaction ID</span>
          <span className="col-span-2">{orderId}</span>
        </div> */}
      </div>
      <button
        onClick={() => router.push("/")}
        className={`text-center text-lg font-semibold text-black w-full p-4 bg-yellow-500 mt-4`}
      >
        RETURN TO HOME
      </button>
    </div>
  );
};

export default Success;
