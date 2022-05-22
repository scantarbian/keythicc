import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
// components
import { AddressSelector, NewAddressForm } from "./AddressForms";
// data
import { Address } from "models/Address";
// context
import { CartContext } from "contexts/CartContext";

type DestinationFormProps = {
  className?: string;
  countries: Array<{
    id: number;
    name: string;
    code: string;
  }>;
};

const DestinationForm = ({ className, countries }: DestinationFormProps) => {
  const [availableAddresses, setAvailableAddresses] = useState<
    Array<
      Address & {
        _id: string;
      }
    >
  >([]);
  const [addNewAddress, setAddNewAddress] = useState(false);

  const { destination } = useContext(CartContext);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      fetch(`/api/address?accountId=${session.user._id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setAvailableAddresses(data.addresses);
        });
    }
  }, []);

  return (
    <div className={className}>
      {availableAddresses.length > 0 && !addNewAddress && (
        <AddressSelector
          addresses={availableAddresses}
          setAddNewAddress={setAddNewAddress}
          addNewAddress={addNewAddress}
        />
      )}
      {(addNewAddress || availableAddresses.length === 0) && (
        <NewAddressForm
          countries={countries}
          setAddNewAddress={setAddNewAddress}
          addNewAddress={addNewAddress}
        />
      )}
    </div>
  );
};

export default DestinationForm;
