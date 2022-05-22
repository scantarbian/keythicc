import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

export const CreditCard = () => {
  const { data: session, status } = useSession();

  const { orderId, setPhase, setIframeUrl, getTotalPriceWithShipping } =
    useContext(CartContext);

  type Inputs = {
    number: number;
    name: string;
    expiry_month: number;
    expiry_year: number;
    cvv: number;
    saveInfo?: boolean;
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (status === "authenticated" && data.saveInfo) {
    }

    fetch("/api/midtrans/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cvv: data.cvv,
        number: data.number,
        expiry_month: data.expiry_month,
        expiry_year: data.expiry_year,
        order_id: orderId,
        gross_amount: getTotalPriceWithShipping(),
        customer_details: {
          billing: {
            name: data.name,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetch("/api/order", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: orderId,
            transactionId: res.transaction_id,
            transactionStatus: res.transaction_status,
          }),
        });

        if (res.transaction_status === "capture") {
          // set phase to success
        }

        if (res.redirect_url) {
          setPhase("verify");
          setIframeUrl(res.redirect_url);
        }
      });

    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-white gap-4 p-4"
    >
      <input
        type="text"
        {...register("name", {
          required: true,
        })}
        className="border-white rounded-md placeholder:text-white bg-special-grey-2"
        placeholder="Name on card"
      />
      <input
        type="text"
        {...register("number", {
          required: true,
        })}
        className="border-white rounded-md placeholder:text-white bg-special-grey-2"
        placeholder="Card number"
      />
      <div className="flex gap-4 items-center">
        <input
          type="text"
          {...register("expiry_month", {
            required: true,
          })}
          className="border-white rounded-md placeholder:text-white bg-special-grey-2"
          placeholder="Expiry Month"
        />
        <span className="text-3xl">/</span>
        <input
          type="text"
          {...register("expiry_year", {
            required: true,
          })}
          className="border-white rounded-md placeholder:text-white bg-special-grey-2"
          placeholder="Expiry Year"
        />
        <input
          type="text"
          {...register("cvv", {
            required: true,
          })}
          className="border-white rounded-md placeholder:text-white bg-special-grey-2"
          placeholder="Security code"
        />
      </div>
      <button
        className={`text-center text-lg font-semibold text-black w-full p-4 mt-4 bg-yellow-500`}
      >
        PROCESS PAYMENT
      </button>
    </form>
  );
};

export const GoPay = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-white gap-4 p-4"
    >
      <button
        className={`text-center text-lg font-semibold text-black w-full p-4 bg-yellow-500`}
      >
        PROCESS PAYMENT
      </button>
    </form>
  );
};
