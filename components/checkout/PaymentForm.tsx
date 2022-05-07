import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { selectStyleConfig } from "./ShippingForm";
import { AVAILABLE_METHODS } from "./PaymentMethods";
// components
import Select from "react-select";

type Prop = {
  className?: string;
};

const PaymentForm = ({ className }: Prop) => {
  const {
    setPhase,
    shipper,
    shipping,
    providers,
    provider,
    setProvider,
    payment_method,
    setPaymentMethod,
  } = useContext(CartContext);

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
          <div className="p-2 flex justify-between items-center">
            <span className="w-1/6">Method</span>
            <span className="flex-1">
              <Select
                options={providers.map((provider) => ({
                  label: `${provider.logistic.name} - ${
                    provider.rate.name
                  } (Rp${provider.final_price.toLocaleString()})`,
                  value: provider.rate.id,
                }))}
                value={
                  provider.logistic && provider.rate
                    ? {
                        label: `${provider.logistic.name} - ${
                          provider.rate.name
                        } (Rp${provider.final_price.toLocaleString()})`,
                        value: provider.rate.id,
                      }
                    : undefined
                }
                onChange={(value) => {
                  setProvider(
                    providers.find(
                      (provider) => provider.rate.id === value!.value
                    )!
                  );
                }}
                placeholder="Select Shipping Method"
                className="w-full"
                styles={selectStyleConfig}
              />
            </span>
          </div>
        </div>
        <span className="text-2xl font-bold">Payment Details</span>
        <Select
          options={AVAILABLE_METHODS}
          value={
            payment_method > 0
              ? {
                  label: AVAILABLE_METHODS[payment_method].label,
                  value: payment_method,
                }
              : undefined
          }
          onChange={(value) => {
            setPaymentMethod(value!.value);
          }}
          placeholder="Select Payment Method"
          className="w-full"
          styles={selectStyleConfig}
        />
      </div>
    </div>
  );
};

export default PaymentForm;
