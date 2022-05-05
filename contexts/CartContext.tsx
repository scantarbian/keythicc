import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";
import { Builder } from "models/Builder";
import { Shipping } from "models/Shipping";
import { Account } from "models/Account";
// hooks
import { useSnackbar } from "notistack";

type CartProps = {
  children: ReactNode;
};

type StateProps = {
  contents:
    | Array<{
        product: (Product | Builder) & { _id: string };
        quantity: number;
        selected: boolean;
      }>
    | [];
  phase: "information" | "payment";
  shipper: Account;
  shipping: Shipping;
  carrier: number;
  provinces: Array<any>;
  cities: Array<any>;
  suburbs: Array<any>;
  areas: Array<any>;
  setProvinces: (provinces: Array<any>) => void;
  setCities: (cities: Array<any>) => void;
  setSuburbs: (suburbs: Array<any>) => void;
  setAreas: (areas: Array<any>) => void;
  setCarrier: (carrier: number) => void;
  setPhase: (phase: "information" | "payment") => void;
  setShipper: (shipper: Account) => void;
  setShipping: (shipping: Shipping) => void;
  addContent: (product: (Product | Builder) & { _id: string }) => void;
  addQuantity: (product: (Product | Builder) & { _id: string }) => void;
  removeQuantity: (product: (Product | Builder) & { _id: string }) => void;
  removeContent: (product: (Product | Builder) & { _id: string }) => void;
  toggleSelect: (product: (Product | Builder) & { _id: string }) => void;
  toggleSelectAll: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
  getTotalPriceWithShipping: () => number;
};

const initState: StateProps = {
  contents: [],
  phase: "information",
  shipper: {} as Account,
  shipping: {} as Shipping,
  carrier: 0,
  provinces: [],
  cities: [],
  suburbs: [],
  areas: [],
  setProvinces: () => {},
  setCities: () => {},
  setSuburbs: () => {},
  setAreas: () => {},
  setCarrier: () => {},
  setPhase: () => {},
  setShipper: () => {},
  setShipping: () => {},
  addContent: (product: (Product | Builder) & { _id: string }) => {},
  addQuantity: (product: (Product | Builder) & { _id: string }) => {},
  removeQuantity: (product: (Product | Builder) & { _id: string }) => {},
  removeContent: (product: (Product | Builder) & { _id: string }) => {},
  toggleSelect: (product: (Product | Builder) & { _id: string }) => {},
  toggleSelectAll: () => {},
  getTotalPrice: () => 0,
  getTotalQuantity: () => 0,
  getTotalPriceWithShipping: () => 0,
};

export const CartContext = createContext(initState);

const CartProvider = ({ children }: CartProps) => {
  const [contents, setContents] = useState<StateProps["contents"]>([]);
  const [phase, setPhase] = useState<StateProps["phase"]>("information");
  const [shipper, setShipper] = useState<StateProps["shipper"]>({} as Account);
  const [shipping, setShipping] = useState<StateProps["shipping"]>(
    {} as Shipping
  );
  const [carrier, setCarrier] = useState<StateProps["carrier"]>(0);
  const [provinces, setProvinces] = useState<StateProps["provinces"]>([]);
  const [cities, setCities] = useState<StateProps["cities"]>([]);
  const [suburbs, setSuburbs] = useState<StateProps["suburbs"]>([]);
  const [areas, setAreas] = useState<StateProps["areas"]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const addContent = (product: (Product | Builder) & { _id: string }) => {
    // append content to existing state
    if (contents.find((content) => content.product._id === product._id)) {
      setContents((prevState) =>
        prevState.map((content) =>
          content.product._id === product._id
            ? {
                product,
                quantity: content.quantity + 1,
                selected: content.selected,
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
          selected: true,
        },
      ]);
    }
    enqueueSnackbar("Added to cart", { variant: "success" });
  };

  const addQuantity = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? {
              product,
              quantity: content.quantity + 1,
              selected: content.selected,
            }
          : content
      )
    );
  };

  const removeQuantity = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? {
              product,
              quantity: content.quantity - 1,
              selected: content.selected,
            }
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

    contents
      .filter((item) => item.selected)
      .forEach((content) => {
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

  const getTotalPriceWithShipping = () => {
    return getTotalPrice() + carrier;
  };

  const getTotalQuantity = () => {
    let accumulator = 0;

    contents
      .filter((item) => item.selected)
      .forEach((content) => {
        accumulator += content.quantity;
      });

    return accumulator;
  };

  const toggleSelect = (product: (Product | Builder) & { _id: string }) => {
    setContents(
      contents.map((content) =>
        content.product._id === product._id
          ? { product, quantity: content.quantity, selected: !content.selected }
          : content
      )
    );
  };

  const toggleSelectAll = () => {
    setContents(
      contents.map((content) => ({
        product: content.product,
        quantity: content.quantity,
        selected: !contents.every((content) => content.selected),
      }))
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
        getTotalPrice,
        getTotalQuantity,
        getTotalPriceWithShipping,
        toggleSelect,
        toggleSelectAll,
        phase,
        setPhase,
        shipper,
        setShipper,
        shipping,
        setShipping,
        carrier,
        setCarrier,
        provinces,
        setProvinces,
        cities,
        setCities,
        suburbs,
        setSuburbs,
        areas,
        setAreas,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
