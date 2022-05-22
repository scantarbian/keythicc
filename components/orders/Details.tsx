// types
import { Order } from "models/Order";
import { Product } from "models/Product";
import { Builder } from "models/Builder";
// components
import CartItem from "../cart/CartItem";

type Props = {
  order: Order & { _id: string };
};

const Details = ({ order }: Props) => {
  return (
    <div className="flex border-2 border-yellow-500 p-4 w-full divide-x-2 divide-yellow-500">
      <div className="flex flex-col pr-4">
        <span className="text-xl font-bold text-yellow-500">
          {order._id.toUpperCase()}
        </span>
        <span className="text-white">{order.email}</span>
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
