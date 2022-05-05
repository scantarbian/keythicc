import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
// components
import Select from "react-select";
import { EmailWatcher } from "./Watchers";

type ShippingFormProps = {
  className?: string;
  countries: Array<{
    id: number;
    name: string;
    code: string;
  }>;
};

export type Inputs = {
  email: string;
  fullname: string;
  company: string;
  country: {
    value: number;
    label: string;
  };
  address: string;
  postalcode: string;
  phonenumber: string;
};

const ShippingForm = ({ className, countries }: ShippingFormProps) => {
  const { setPhase, setShipper, shipper, shipping, setShipping } =
    useContext(CartContext);

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    setShipper(session.user);
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: shipper?.email || session?.user?.email,
      fullname: shipping?.fullname || session?.user?.fullname,
      company: shipping?.company,
      country: {
        value: shipping?.country,
        label: countries.find((country) => country.id === shipping?.country)
          ?.name,
      },
      address: shipping?.address,
      postalcode: shipping?.postalcode,
      phonenumber: shipping?.phonenumber,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!shipper.email) {
      setShipper({
        email: data.email,
      });
    }

    setShipping({
      fullname: data.fullname,
      company: data.company,
      country: data.country.value,
      address: data.address,
      postalcode: data.postalcode,
      phonenumber: data.phonenumber,
    });

    setPhase("payment");
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
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            className="bg-black border-white rounded-md"
            placeholder="Email"
            disabled={status === "authenticated"}
          />

          {status !== "authenticated" && (
            <EmailWatcher control={control} status={status} />
          )}

          {errors && errors.email?.message && (
            <span className="text-red-500 mt-3">{errors.email?.message}</span>
          )}
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
                  value: country.id,
                  label: `${country.name}`,
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
                  placeholder: (provided) => ({
                    ...provided,
                    color: "#fff",
                  }),
                }}
              />
            )}
          />
          <input
            type="text"
            {...register("fullname", {
              required: true,
            })}
            className="bg-black border-white rounded-md"
            placeholder="Full name"
            disabled={status === "authenticated"}
          />
          <input
            type="text"
            {...register("company")}
            className="bg-black border-white rounded-md"
            placeholder="Company (optional)"
          />
          <textarea
            {...register("address", {
              required: true,
            })}
            className="bg-black border-white rounded-md h-28 resize-none"
            placeholder="Address"
          />
          <input
            type="text"
            {...register("postalcode", {
              required: true,
            })}
            className="bg-black border-white rounded-md"
            placeholder="Postal code"
          />
          <input
            type="tel"
            {...register("phonenumber", {
              required: true,
            })}
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
