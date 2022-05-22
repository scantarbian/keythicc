import { createContext, ReactNode, useState, useEffect } from "react";
import { Product } from "models/Product";
import { Builder } from "models/Builder";
import { Address } from "models/Address";
import { Account } from "models/Account";
// hooks
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";

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

type Phases = "information" | "payment" | "verify" | "success";

type StateProps = {
  orderId: string | undefined;
  contents:
    | Array<{
        product: (Product | Builder) & { _id: string };
        quantity: number;
        selected: boolean;
      }>
    | [];
  phase: Phases;
  shipper: Account;
  destination: Address & { _id?: string };
  paymentMethod: number;
  provider: Provider | undefined;
  providers: Array<Provider>;
  provinces: Array<any>;
  cities: Array<any>;
  suburbs: Array<any>;
  areas: Array<any>;
  iframeUrl: string | undefined;
  setContents: (contents: any) => void;
  setOrderId: (orderId: string) => void;
  setProvinces: (provinces: Array<any>) => void;
  setCities: (cities: Array<any>) => void;
  setSuburbs: (suburbs: Array<any>) => void;
  setAreas: (areas: Array<any>) => void;
  setProvider: (provider: Provider | undefined) => void;
  setProviders: (providers: Array<Provider>) => void;
  setPhase: (phase: Phases) => void;
  setPaymentMethod: (paymentMethod: number) => void;
  setShipper: (shipper: Account) => void;
  setDestination: (destination: Address & { _id?: string }) => void;
  setIframeUrl: (iframeUrl: string | undefined) => void;
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
  orderId: undefined,
  contents: [],
  phase: "information",
  shipper: {} as Account,
  destination: {} as Address & { _id?: string },
  provider: {} as Provider | undefined,
  providers: [],
  provinces: [],
  cities: [],
  suburbs: [],
  areas: [],
  paymentMethod: 0,
  iframeUrl: undefined,
  setContents: () => {},
  setOrderId: () => {},
  setPaymentMethod: () => {},
  setProvinces: () => {},
  setCities: () => {},
  setSuburbs: () => {},
  setAreas: () => {},
  setProvider: () => {},
  setProviders: () => {},
  setPhase: () => {},
  setShipper: () => {},
  setDestination: () => {},
  setIframeUrl: () => {},
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
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [contents, setContents] = useState<StateProps["contents"]>([]);
  const [phase, setPhase] = useState<StateProps["phase"]>("information");
  const [shipper, setShipper] = useState<StateProps["shipper"]>({} as Account);
  const [destination, setDestination] = useState<StateProps["destination"]>(
    {} as Address & { _id?: string }
  );
  const [provider, setProvider] = useState<StateProps["provider"]>(undefined);
  const [providers, setProviders] = useState<StateProps["providers"]>([]);
  const [provinces, setProvinces] = useState<StateProps["provinces"]>([]);
  const [cities, setCities] = useState<StateProps["cities"]>([]);
  const [suburbs, setSuburbs] = useState<StateProps["suburbs"]>([]);
  const [areas, setAreas] = useState<StateProps["areas"]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<StateProps["paymentMethod"]>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [iframeUrl, setIframeUrl] =
    useState<StateProps["iframeUrl"]>(undefined);

  // on init, when logged in, get the user's cart
  // if there's none, create an empty cart
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const { user } = session;

      fetch(`/api/cart?accountId=${user._id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          // if cart doesn't exist, create one
          if (res.cart === null) {
            fetch(`/api/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                account: user._id,
              }),
            });
          } else {
            setContents(res.cart.items);
          }
        });
    }
  }, [session]);

  // update cart everytime content changes
  useEffect(() => {
    if (session && session.user) {
      const { user } = session;

      fetch(`/api/cart?accountId=${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: contents,
        }),
      });
    }
  }, [contents]);

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
    return getTotalPrice() + (provider?.final_price || 0);
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
        orderId,
        setOrderId,
        paymentMethod,
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
        iframeUrl,
        setIframeUrl,
        shipper,
        setShipper,
        destination,
        setDestination,
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
        setContents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
