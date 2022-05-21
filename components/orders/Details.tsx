// types
import { Order } from "models/Order";

type Props = {
  order: Order & { _id: string };
};

const Details = ({ order }: Props) => {
  return <></>;
};
export default Details;
