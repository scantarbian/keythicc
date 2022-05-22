// types
import { Order } from "models/Order";
import { Address } from "models/Address";
// components
import CartItem from "../cart/CartItem";

type Props = {
  order: Order & { _id: string; destination: Address };
};

const Details = ({ order }: Props) => {
  const { destination } = order;

  return (
    <div className="flex border-2 border-yellow-500 p-4 w-full divide-x-2 divide-yellow-500">
      <div className="flex flex-col pr-4 text-white ">
        <span className="text-xl font-bold text-yellow-500">
          {order._id.toUpperCase()}
        </span>
        <span>{order.createdAt}</span>
        <span>{order.transactionStatus}</span>
        <span>{order.email}</span>
        <span>Destination</span>
        {destination.country.value === 228 ? (
          <>
            <span>{destination.address}</span>
            <span>{`${destination.area!.label}, ${destination.suburb!.label}, ${
              destination.city!.label
            }, ${destination.province!.label} `}</span>
            <span>{`${destination.country.label} ${destination.postalcode}`}</span>
            <span>{destination.phonenumber}</span>
          </>
        ) : (
          <>
            <span>{destination.address}</span>
            <span>{`${destination.country.label} ${destination.postalcode}`}</span>
            <span>{destination.phonenumber}</span>
          </>
        )}
      </div>
      <div className="flex flex-col pl-4 flex-1">
        <span className="text-lg font-bold text-white text-right">ITEMS</span>
        {order.items.map((item: any) => (
          <CartItem key={item._id} item={item} displayOnly={true} />
        ))}
        {/* <span className="text-white">{JSON.stringify(order)}</span> */}
      </div>
    </div>
  );
};
export default Details;
