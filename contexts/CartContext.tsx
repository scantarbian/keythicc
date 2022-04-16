import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";
import { Builder } from "models/Builder";

type CartProps = {
  children: ReactNode;
};

type StateProps = {
  contents:
    | Array<
        | {
            product: Product & { _id: string };
            quantity: number;
          }
        | {
            product: Builder & { _id: string };
            quantity: number;
          }
      >
    | [];
  addContent: (product: Product & { _id: string }) => void;
  addQuantity: (product: Product & { _id: string }) => void;
  removeQuantity: (product: Product & { _id: string }) => void;
  removeContent: (product: Product & { _id: string }) => void;
};

const initState: StateProps = {
  contents: [],
  addContent: (product: Product) => {},
  addQuantity: (product: Product) => {},
  removeQuantity: (product: Product) => {},
  removeContent: (product: Product) => {},
};

export const CartContext = createContext(initState);

const CartProvider = ({ children }: CartProps) => {
  const [contents, setContents] = useState<StateProps["contents"]>([]);

  const addContent = (product: Product & { _id: string }) => {
    setContents([{ product, quantity: 1 }]);
  };

  const addQuantity = (product: Product & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? { product, quantity: content.quantity + 1 }
          : content
      )
    );
  };

  const removeQuantity = (product: Product & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? { product, quantity: content.quantity - 1 }
          : content
      )
    );
  };

  const removeContent = (product: Product & { _id: string }) => {
    setContents(
      contents.filter((content) => content.product._id !== product._id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        contents,
        addContent,
        addQuantity,
        removeContent,
        removeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
