import { Dispatch, SetStateAction, useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
// components
import {
  EmailWatcher,
  InitCountryWatcher,
  InitProvinceWatcher,
  InitCityWatcher,
  InitSuburbWatcher,
} from "./Watchers";
import Select, { StylesConfig, GroupBase } from "react-select";
// data
import { Address } from "models/Address";
// context
import { CartContext } from "contexts/CartContext";

type NewAddressFormProps = {
  countries: Array<{
    id: number;
    name: string;
    code: string;
  }>;
  setAddNewAddress: Dispatch<SetStateAction<boolean>>;
  addNewAddress: boolean;
};

export type Inputs = {
  email: string;
  fullname: string;
  company: string;
  country: {
    value: number;
    label: string;
  };
  province?: {
    value: number;
    label: string;
  };
  city?: {
    value: number;
    label: string;
  };
  suburb?: {
    value: number;
    label: string;
  };
  area?: {
    value: number;
    label: string;
  };
  address: string;
  postalcode: string;
  phonenumber: string;
  saveAddress?: boolean;
};

export const selectStyleConfig: StylesConfig<
  {
    value: number;
    label: string;
  },
  false,
  GroupBase<{
    value: number;
    label: string;
  }>
> = {
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
};

export const NewAddressForm = ({
  countries,
  addNewAddress,
  setAddNewAddress,
}: NewAddressFormProps) => {
  const {
    setPhase,
    setShipper,
    shipper,
    destination,
    setDestination,
    provinces,
    cities,
    areas,
    suburbs,
    getTotalPrice,
    setProviders,
    setProvider,
  } = useContext(CartContext);

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
      fullname: destination?.fullname || session?.user?.fullname,
      company: destination?.company,
      country: destination.country || undefined,
      province: destination.province || undefined,
      city: destination.city || undefined,
      suburb: destination.suburb || undefined,
      area: destination.area || undefined,
      address: destination?.address,
      postalcode: destination?.postalcode,
      phonenumber: destination?.phonenumber,
    },
  });

  // init watchers
  const selectedCountry = watch("country");
  InitCountryWatcher(control);
  InitProvinceWatcher(control);
  InitCityWatcher(control);
  InitSuburbWatcher(control);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const basicDestinationData = {
      fullname: data.fullname,
      company: data.company,
      country: data.country,
      province: data.province,
      city: data.city,
      suburb: data.suburb,
      area: data.area,
      address: data.address,
      postalcode: data.postalcode,
      phonenumber: data.phonenumber,
    };

    if (!shipper.email) {
      setShipper({
        email: data.email,
      });
    }

    if (data.country.value === 228) {
      // handle domestic shipment
      fetch(
        `/api/shipper/getDomesticPricing?destination_area_id=${
          data.area?.value
        }&item_value=${getTotalPrice()}`
      )
        .then((res) => res.json())
        .then((res) => {
          setProviders(res.data.pricings);
          setProvider(undefined);
        });
    } else {
      // handle international shipment
      fetch(
        `/api/shipper/getInternationalPricing?destination_country_id=${
          data.country.value
        }&item_price=${getTotalPrice()}`
      )
        .then((res) => res.json())
        .then((res) => {
          setProviders(res.data.pricings);
          setProvider(undefined);
        });
    }

    if (!destination._id) {
      // if user wants to save their address, we'll associate it with their account id
      if (status === "authenticated" && data.saveAddress) {
        fetch(`/api/address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: session.user._id,
            email: data.email,
            ...basicDestinationData,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setDestination({
              ...basicDestinationData,
              _id: res.address._id,
            });
          });
      } else {
        // if not? well, we still need it
        // so save it anyway
        fetch(`/api/address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            ...basicDestinationData,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setDestination({
              ...basicDestinationData,
              _id: res.address._id,
            });
          });
      }
    } else {
      // this handles the case where the user is editing their address
      fetch(`/api/address/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: destination._id,
          email: data.email,
          ...basicDestinationData,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setDestination({
            ...basicDestinationData,
            _id: res.address._id,
          });
        });
    }

    setPhase("payment");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-white gap-8"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold mb-6">Contact Information</span>
          {addNewAddress === true && (
            <button
              type="button"
              className="text-yellow-500 hover:underline"
              onClick={() => {
                setAddNewAddress(!addNewAddress);
              }}
            >
              Cancel
            </button>
          )}
        </div>
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
        <span className="text-2xl font-bold mb-2">Destination Information</span>
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
              styles={selectStyleConfig}
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
        />
        <input
          type="text"
          {...register("company")}
          className="bg-black border-white rounded-md"
          placeholder="Company (optional)"
        />
        {selectedCountry && selectedCountry.value === 228 && (
          <>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={provinces.map((province) => ({
                    value: province.id,
                    label: `${province.name}`,
                  }))}
                  placeholder="Select Province"
                  className="w-full"
                  styles={selectStyleConfig}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cities.map((city) => ({
                    value: city.id,
                    label: `${city.name}`,
                  }))}
                  placeholder="Select City"
                  className="w-full"
                  styles={selectStyleConfig}
                />
              )}
            />
            <Controller
              name="suburb"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={suburbs.map((suburb) => ({
                    value: suburb.id,
                    label: `${suburb.name}`,
                  }))}
                  placeholder="Select Suburb"
                  className="w-full"
                  styles={selectStyleConfig}
                />
              )}
            />
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={areas.map((area) => ({
                    value: area.id,
                    label: `${area.name}`,
                  }))}
                  placeholder="Select Area"
                  className="w-full"
                  styles={selectStyleConfig}
                />
              )}
            />
          </>
        )}

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
        {status === "authenticated" && (
          <label className="items-center flex gap-2">
            <input
              type="checkbox"
              className="h-7 w-7 border-2 border-yellow-500 bg-shark-500 checked:text-yellow-500 rounded-sm"
              {...register("saveAddress")}
            />
            Save Address
          </label>
        )}
      </div>
      <button
        type="submit"
        className={`text-center text-lg font-semibold text-black w-full p-4 bg-yellow-500`}
      >
        SET ADDRESS & PAY
      </button>
    </form>
  );
};

type AddressSelectorProps = {
  addresses: Array<
    Address & {
      _id: string;
    }
  >;
  setAddNewAddress: Dispatch<SetStateAction<boolean>>;
  addNewAddress: boolean;
};

type AddressSelectorInputs = {
  addressId: string;
};

export const AddressSelector = ({
  addresses,
  setAddNewAddress,
  addNewAddress,
}: AddressSelectorProps) => {
  const {
    destination,
    setShipper,
    getTotalPrice,
    setProviders,
    setProvider,
    shipper,
    setDestination,
    setPhase,
  } = useContext(CartContext);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressSelectorInputs>({
    defaultValues: {
      addressId: destination?._id,
    },
  });

  const onSubmit: SubmitHandler<AddressSelectorInputs> = (data) => {
    const selected = addresses.find(
      (address) => address._id === data.addressId
    )!;

    const basicDestinationData = {
      fullname: selected.fullname,
      company: selected.company,
      country: selected.country,
      province: selected.province,
      city: selected.city,
      suburb: selected.suburb,
      area: selected.area,
      address: selected.address,
      postalcode: selected.postalcode,
      phonenumber: selected.phonenumber,
    };

    if (!shipper.email) {
      setShipper({
        email: selected.email!,
      });
    }

    if (selected.country.value === 228) {
      // handle domestic shipment
      fetch(
        `/api/shipper/getDomesticPricing?destination_area_id=${
          selected.area?.value
        }&item_value=${getTotalPrice()}`
      )
        .then((res) => res.json())
        .then((res) => {
          setProviders(res.data.pricings);
          setProvider(undefined);
        });
    } else {
      // handle international shipment
      fetch(
        `/api/shipper/getInternationalPricing?destination_country_id=${
          selected.country.value
        }&item_price=${getTotalPrice()}`
      )
        .then((res) => res.json())
        .then((res) => {
          setProviders(res.data.pricings);
          setProvider(undefined);
        });
    }

    setDestination({
      ...basicDestinationData,
      _id: selected._id,
    });

    setPhase("payment");
  };

  return (
    <form
      className="flex flex-col text-white gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Select Address</span>
        <button
          type="button"
          className="text-yellow-500 hover:underline"
          onClick={() => {
            setAddNewAddress(!addNewAddress);
          }}
        >
          Add New Address
        </button>
      </div>
      {addresses.map((address) => {
        return (
          <label
            key={address._id}
            className="p-4 border-2 border-yellow-500 flex items-center gap-x-4"
          >
            <input
              className="m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-orange-500 rounded-full"
              type="radio"
              {...register("addressId", {
                required: true,
              })}
              value={address._id}
            />
            <div className="flex flex-col">
              <span>{address.fullname}</span>
              {address.country.value === 228 ? (
                <>
                  <span>{address.address}</span>
                  <span>{`${address.area!.label}, ${address.suburb!.label}, ${
                    address.city!.label
                  }, ${address.province!.label} `}</span>
                  <span>{`${address.country.label} ${address.postalcode}`}</span>
                  <span>{address.phonenumber}</span>
                </>
              ) : (
                <>
                  <span>{address.address}</span>
                  <span>{`${address.country.label} ${address.postalcode}`}</span>
                  <span>{address.phonenumber}</span>
                </>
              )}
            </div>
          </label>
        );
      })}
      <button
        type="submit"
        className={`text-center text-lg font-semibold text-black w-full p-4 bg-yellow-500`}
      >
        SELECT ADDRESS & PAY
      </button>
    </form>
  );
};
