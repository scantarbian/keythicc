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

export type Provider = {
  logistic: {
    id: number;
    name: string;
    logo_url: string;
    code: string;
    company_name: string;
  };
  rate: {
    id: number;
    name: string;
    type: string;
    description: string;
    full_description: string;
    is_hubless: boolean;
  };
  min_day: number;
  max_day: number;
  unit_price: number;
  insurance_fee: number;
  must_use_insurance: boolean;
  total_price: number;
  currency: string;
  final_price: number;
  insurance_applied: boolean;
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
  payment_method: number;
  provider: Provider;
  providers: Array<Provider>;
  provinces: Array<any>;
  cities: Array<any>;
  suburbs: Array<any>;
  areas: Array<any>;
  setProvinces: (provinces: Array<any>) => void;
  setCities: (cities: Array<any>) => void;
  setSuburbs: (suburbs: Array<any>) => void;
  setAreas: (areas: Array<any>) => void;
  setProvider: (provider: Provider) => void;
  setProviders: (providers: Array<Provider>) => void;
  setPhase: (phase: "information" | "payment") => void;
  setPaymentMethod: (payment_method: number) => void;
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
  provider: {} as Provider,
  providers: [],
  provinces: [],
  cities: [],
  suburbs: [],
  areas: [],
  payment_method: 0,
  setPaymentMethod: () => {},
  setProvinces: () => {},
  setCities: () => {},
  setSuburbs: () => {},
  setAreas: () => {},
  setProvider: () => {},
  setProviders: () => {},
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
  const [provider, setProvider] = useState<StateProps["provider"]>(
    {} as Provider
  );
  const [providers, setProviders] = useState<StateProps["providers"]>([]);
  const [provinces, setProvinces] = useState<StateProps["provinces"]>([]);
  const [cities, setCities] = useState<StateProps["cities"]>([]);
  const [suburbs, setSuburbs] = useState<StateProps["suburbs"]>([]);
  const [areas, setAreas] = useState<StateProps["areas"]>([]);
  const [payment_method, setPaymentMethod] = useState<StateProps["payment_method"]>(
    0
  );
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
    return getTotalPrice() + (provider.final_price || 0);
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
        payment_method,
        setPaymentMethod,
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
        provider,
        providers,
        setProviders,
        setProvider,
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
