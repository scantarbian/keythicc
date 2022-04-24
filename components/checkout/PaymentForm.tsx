import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
// components
import Select from "react-select";

type Prop = {
  className?: string;
};

const SHIPPING_OPTIONS = [
  {
    label: "Standard",
    value: 25000,
  },
  {
    label: "Express",
    value: 35000,
  },
  {
    label: "Overnight",
    value: 45000,
  },
];

const PaymentForm = ({ className }: Prop) => {
  const { setPhase, shipper, shipping, setCarrier, carrier } =
    useContext(CartContext);

  return (
    <div className={`${className} text-white`}>
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-bold">Shipping Details</span>
        <span>Shipper.id integration coming soon</span>
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
                options={SHIPPING_OPTIONS}
                value={
                  carrier > 0
                    ? SHIPPING_OPTIONS.find(
                        (option) => option.value === carrier
                      )
                    : undefined
                }
                onChange={(value) => setCarrier(value!.value)}
                placeholder="Select Shipping Method"
                className="w-full"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: "#fff",
                    backgroundColor: state.isSelected
                      ? "rgb(251 146 60)"
                      : state.isFocused
                      ? "rgb(251 146 60 / 0.5)"
                      : "#000",
                  }),
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: 0,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#000",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#fff",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: "#fff",
                  }),
                }}
              />
            </span>
          </div>
        </div>
        <span className="text-2xl font-bold">Payment Details</span>
        <span>Midtrans integration coming soon</span>
      </div>
    </div>
  );
};

export default PaymentForm;
