import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
// components
import CartItem from "components/cart/CartItem";

type ItemListProps = {
  className?: string;
};

const ItemList = ({ className }: ItemListProps) => {
  const { contents } = useContext(CartContext);

  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-col divide-y-2 ">
        {contents.map((item, index) => (
          <CartItem key={index} item={item} displayOnly className="px-20" />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
