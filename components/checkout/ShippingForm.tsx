import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type ShippingFormProps = {
  className?: string;
};

type Inputs = {
  email?: string;
  fullname: string;
  company: string;
  country: string;
  address: string;
  postalcode: string;
  phonenumber: string;
};

const ShippingForm = ({ className }: ShippingFormProps) => {
  const { contents } = useContext(CartContext);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-white gap-8"
      >
        <div className="flex flex-col">
          <span className="text-2xl font-bold mb-6">Contact Information</span>
          <input
            type="text"
            {...register("email")}
            className="bg-black border-white rounded-md"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold mb-2">Shipping Information</span>
          <input
            type="text"
            {...register("fullname")}
            className="bg-black border-white rounded-md"
            placeholder="Full name"
          />
          <input
            type="text"
            {...register("company")}
            className="bg-black border-white rounded-md"
            placeholder="Company (optional)"
          />
          <textarea
            {...register("company")}
            className="bg-black border-white rounded-md h-28 resize-none"
            placeholder="Address"
          />
          <input
            type="text"
            {...register("phonenumber")}
            className="bg-black border-white rounded-md"
            placeholder="Phone number"
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
