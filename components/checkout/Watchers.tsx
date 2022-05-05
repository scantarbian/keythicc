import { useWatch, Control } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
// components
import Link from "next/link";
// Types
import { Inputs } from "./ShippingForm";
// fetch headers
import { shipper } from "lib/fetchHeaders";

const emailWatcherResponse = async (email: string) => {
  return await fetch("/api/account" + `?email=${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success && res.password) {
        return (
          <div className="text-yellow-500 mt-3">
            Email already registered, please{" "}
            <Link href={"/auth"}>
              <a className="underline">log in</a>
            </Link>
          </div>
        );
      } else if (res.success && !res.password) {
        return (
          <div className="text-yellow-500 mt-3">
            Email exists but not registered, please{" "}
            <Link href={"/auth/register"}>
              <a className="underline">sign up</a>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="text-yellow-500 mt-3">
            Email not yet registered, please{" "}
            <Link href={"/auth/register"}>
              <a className="underline">sign up</a>
            </Link>
          </div>
        );
      }
    });
};

export const EmailWatcher = ({
  control,
  status,
}: {
  control: Control<Inputs>;
  status: string;
}) => {
  const email = useWatch({
    control,
    name: "email",
    disabled: status === "authenticated",
  });

  const [element, setElement] = useState<ReactNode>(<></>);

  useEffect(() => {
    if (email && email.length > 0) {
      emailWatcherResponse(email).then((res) => {
        setElement(res);
      });
    }
  }, [email]);

  return <>{element}</>;
};

const countryFetcher = async (value: number) => {
  return await fetch(`/api/shipper/getProvinces?country_id=${value}`, {
    method: "GET",
    headers: shipper(),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const countryWatcher = (control: Control<Inputs>) => {
  const country = useWatch({
    control,
    name: "country",
  });

  const [provinces, setProvinces] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);

  useEffect(() => {
    if (country && country.value === 228) {
      countryFetcher(country.value).then((res) => {
        setProvinces(res);
      });
    }
  }, [country]);

  return provinces;
};

const provinceFetcher = async (value: number) => {
  return await fetch(`/api/shipper/getCities?province_id=${value}`, {
    method: "GET",
    headers: shipper(),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const provinceWatcher = (control: Control<Inputs>) => {
  const province = useWatch({
    control,
    name: "province",
  });

  const [cities, setCities] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);

  useEffect(() => {
    if (province) {
      provinceFetcher(province.value).then((res) => {
        setCities(res);
      });
    }
  }, [province]);

  return cities;
};
