import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// components
import Select from "react-select";
// country data
import countries from "lib/countries.json";

type ShippingFormProps = {
  className?: string;
};

type Inputs = {
  email?: string;
  fullname: string;
  company: string;
  country: {
    value: string;
    label: string;
  };
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
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={countries.map((country) => ({
                  value: country.code,
                  label: `${country.emoji} ${country.name}`,
                }))}
                placeholder="Select Country"
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
            )}
          />
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
            {...register("postalcode")}
            className="bg-black border-white rounded-md"
            placeholder="Postal code"
          />
          <input
            type="tel"
            {...register("phonenumber")}
            className="bg-black border-white rounded-md"
            placeholder="Phone number"
          />
        </div>
        <button
          className={`text-center text-lg font-semibold text-black w-full p-4 bg-yellow-500`}
        >
          SHIP & PAY
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
