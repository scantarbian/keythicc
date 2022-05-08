import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

export const CreditCard = () => {
  const { data: session, status } = useSession();

  const { orderId } = useContext(CartContext);

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
        ...data,
        order_id: orderId,
      }),
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
          className="border-white rounded-md placeholder:text-white bg-special-grey-2 flex-1"
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
