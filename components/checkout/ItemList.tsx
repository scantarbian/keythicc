import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
// components
import CartItem from "components/cart/CartItem";
import PriceInfo from "components/cart/PriceInfo";

type ItemListProps = {
  className?: string;
};

const ItemList = ({ className }: ItemListProps) => {
  const { contents } = useContext(CartContext);

  return (
    <div className={`${className} flex flex-col gap-8`}>
      <div className="flex flex-col divide-y-2 ">
        {contents.map((item, index) => (
          <CartItem key={index} item={item} displayOnly className="px-20" />
        ))}
      </div>
      <PriceInfo displayOnly />
    </div>
  );
};

export default ItemList;
