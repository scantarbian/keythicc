import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
// components
import Select from "react-select";
import Link from "next/link";
// country data
import countries from "lib/countries.json";

type ShippingFormProps = {
  className?: string;
};

type Inputs = {
  email: string;
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

const handleEmailError = (errors: string) => {
  switch (errors) {
    case "1":
      return (
        <>
          Email already registered, please{" "}
          <Link href={"/auth"}>
            <a className="underline">log in</a>
          </Link>
        </>
      );
    case "2":
      return (
        <>
          Email exists but not registered, please{" "}
          <Link href={"/auth/register"}>
            <a className="underline">sign up</a>
          </Link>
        </>
      );
    case "3":
      return (
        <>
          Email not yet registered, please{" "}
          <Link href={"/auth/register"}>
            <a className="underline">sign up</a>
          </Link>
        </>
      );
    default:
      return errors;
  }
};

const ShippingForm = ({ className }: ShippingFormProps) => {
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
        label: countries.find((country) => country.code === shipping?.country)
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
              validate: {
                emailRegistered: async (value) => {
                  if (status !== "authenticated") {
                    return await fetch("/api/account" + `?email=${value}`, {
                      method: "GET",
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.success && res.password) {
                          return "1"; //"Email already registered, please log in"
                        } else if (res.success && !res.password) {
                          return "2"; // "Email exists but not registered, please sign up"
                        } else {
                          return "3"; // "Email not yet registered, please sign up"
                        }
                      });
                  } else {
                    return undefined;
                  }
                },
              },
            })}
            className="bg-black border-white rounded-md"
            placeholder="Email"
            disabled={status === "authenticated"}
          />
          {errors && errors.email?.message && (
            <span className="text-yellow-500 mt-3">
              {handleEmailError(errors.email?.message)}
            </span>
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
