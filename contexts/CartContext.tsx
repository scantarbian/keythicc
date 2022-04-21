import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";
import { Builder } from "models/Builder";

type CartProps = {
  children: ReactNode;
};

type StateProps = {
  contents:
    | Array<{
        product: (Product | Builder) & { _id: string };
        quantity: number;
      }>
    | [];
  addContent: (product: (Product | Builder) & { _id: string }) => void;
  addQuantity: (product: (Product | Builder) & { _id: string }) => void;
  removeQuantity: (product: (Product | Builder) & { _id: string }) => void;
  removeContent: (product: (Product | Builder) & { _id: string }) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
};

const initState: StateProps = {
  contents: [],
  addContent: (product: (Product | Builder) & { _id: string }) => {},
  addQuantity: (product: (Product | Builder) & { _id: string }) => {},
  removeQuantity: (product: (Product | Builder) & { _id: string }) => {},
  removeContent: (product: (Product | Builder) & { _id: string }) => {},
  getTotalPrice: () => 0,
  getTotalQuantity: () => 0,
};

export const CartContext = createContext(initState);

const CartProvider = ({ children }: CartProps) => {
  const [contents, setContents] = useState<StateProps["contents"]>([]);

  const addContent = (product: (Product | Builder) & { _id: string }) => {
    // append content to existing state
    if (contents.find((content) => content.product._id === product._id)) {
      setContents((prevState) =>
        prevState.map((content) =>
          content.product._id === product._id
            ? {
                product,
                quantity: content.quantity + 1,
              }
            : content
        )
      );
    } else {
      setContents((prevState) => [
        ...prevState,
        {
          product,
          quantity: 1,
        },
      ]);
    }
  };

  const addQuantity = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? { product, quantity: content.quantity + 1 }
          : content
      )
    );
  };

  const removeQuantity = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? { product, quantity: content.quantity - 1 }
          : content
      )
    );
  };

  const removeContent = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.filter((content) => content.product._id !== product._id)
    );
  };

  const getTotalPrice = () => {
    let accumulator = 0;

    contents.forEach((content) => {
      // @ts-expect-error
      if (content.product.totalPrice) {
        // @ts-expect-error
        accumulator += content.product.totalPrice * content.quantity;
      } else {
        // @ts-expect-error
        accumulator += content.product.basePrice * content.quantity;
      }
    });

    return accumulator;
  };

  const getTotalQuantity = () => {
    let accumulator = 0;

    contents.forEach((content) => {
      accumulator += content.quantity;
    });

    return accumulator;
  };

  return (
    <CartContext.Provider
      value={{
        contents,
        addContent,
        addQuantity,
        removeContent,
        removeQuantity,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
