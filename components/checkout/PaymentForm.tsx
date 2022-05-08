import { useContext, useEffect } from "react";
import { CartContext } from "contexts/CartContext";
import { selectStyleConfig } from "./ShippingForm";
import { useSession } from "next-auth/react";
// components
import Select from "react-select";
import { GoPay, CreditCard } from "./PaymentMethods";

type Prop = {
  className?: string;
};

const AVAILABLE_METHODS = [
  {
    value: 1,
    label: "Credit Card",
  },
  {
    value: 2,
    label: "GoPay",
  },
];

const displayPaymentForm = (method: number) => {
  switch (method) {
    case 1:
      return <CreditCard />;
    case 2:
      return <GoPay />;
    default:
      return <></>;
  }
};

const PaymentForm = ({ className }: Prop) => {
  const {
    orderId,
    contents,
    setOrderId,
    setPhase,
    shipper,
    destination,
    providers,
    provider,
    setProvider,
    paymentMethod,
    setPaymentMethod,
    getTotalPriceWithShipping,
  } = useContext(CartContext);

  const { data: session, status } = useSession();

  useEffect(() => {
    // create order on provider select
    // if order id is set, changes in provider would result in order updates
    if (orderId) {
      fetch("/api/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          shipperServiceData: {
            logisticName: provider.logistic.name,
            rateName: provider.rate.name,
            rateId: provider.rate.id,
            totalPrice: provider.final_price,
          },
        }),
      });
    } else {
      // post
      fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: session?.user._id,
          email: shipper.email,
          items: contents.map((content) => {
            // @ts-expect-error
            if (!content.product.total_price) {
              return content.product._id;
            }
          }),
          builderItems: contents.map((content) => {
            // @ts-expect-error
            if (content.product.total_price) {
              return content.product._id;
            }
          }),
          shipperServiceData: {
            logisticName: provider.logistic.name,
            rateName: provider.rate.name,
            rateId: provider.rate.id,
            totalPrice: provider.final_price,
          },
          destination: destination._id,
          price: getTotalPriceWithShipping(),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setOrderId(res.order._id);
        });
    }
  }, [provider]);

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
            <span className="flex-1">{destination.address}</span>
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
            paymentMethod > 0
              ? {
                  label: AVAILABLE_METHODS[paymentMethod - 1].label,
                  value: paymentMethod,
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
        <div className="border border-white rounded-md p-2 flex flex-col divide-y divide bg-special-grey">
          {displayPaymentForm(paymentMethod)}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
