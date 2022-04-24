import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

type Prop = {
  className?: string;
};

const PaymentForm = ({ className }: Prop) => {
  const { setPhase, shipper, shipping } = useContext(CartContext);

  return (
    <div className={`${className} text-white`}>
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-bold">Shipping Details</span>
        <div className="border border-white rounded-md p-2 flex flex-col divide-y divide">
          <div className="p-2 flex justify-between">
            <span className="w-1/6">Contact</span>
            <span className="flex-1">{shipper.email}</span>
            <a
              className="underline hover:text-orange-400 cursor-pointer"
              onClick={() => setPhase("information")}
            >
              Change
            </a>
          </div>
          <div className="p-2 flex justify-between">
            <span className="w-1/6">Ship to</span>
            <span className="flex-1">{shipping.address}</span>
            <a
              className="underline hover:text-orange-400 cursor-pointer"
              onClick={() => setPhase("information")}
            >
              Change
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
