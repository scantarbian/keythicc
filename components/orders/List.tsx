import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// component
import Details from "./Details";
// types
import { Order } from "models/Order";
import { Address } from "models/Address";

const List = () => {
  const { data: session } = useSession();

  const [orders, setOrders] = useState<
    Array<
      Order & {
        _id: string;
        destination: Address;
      }
    >
  >([]);

  useEffect(() => {
    if (session && session.user) {
      fetch(`/api/order?accountId=${session.user._id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
        });
    }
  }, []);

  return (
    <div className="flex flex-col mt-4 gap-10">
      {orders.map((order) => {
        return <Details order={order} key={order._id} />;
      })}
    </div>
  );
};

export default List;
