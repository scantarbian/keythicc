import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";
import { Account } from "models/Account";
import { Builder } from "models/Builder";
import { Color } from "models/Color";

type BuilderProps = {
  children: ReactNode;
  baseKeyboard: Product & { _id: string };
};

type StateProps = {
  currentStage: number;
  estimatedTotal: number;
  estimatedShipDate: Date;
  keyThiccPoints: number;
  builderResult: Builder | null;
  keyboard: Product | null;
  keycaps: Product | null;
  switches: Product | null;
  color: Color | null;
  account: Account | null;
  setStage: (stage: number) => void;
  setEstimatedTotal: (total: number) => void;
  setEstimatedShipDate: (date: Date) => void;
  setKeyThiccPoints: (points: number) => void;
  setKeyboard: (keyboard: Product & { _id: string }) => void;
  setKeyboardSize: (size: string) => void;
  setKeycaps: (keycaps: Product & { _id: string }) => void;
  setSwitches: (switches: Product & { _id: string }) => void;
  setColor: (color: Color & { _id: string }) => void;
  setAccount: (account: Account & { _id: string }) => void;
};

const initState: StateProps = {
  currentStage: 0,
  estimatedTotal: 0,
  estimatedShipDate: new Date(),
  keyThiccPoints: 0,
  builderResult: null,
  keyboard: null,
  keycaps: null,
  switches: null,
  color: null,
  account: null,
  setStage: (stage: number) => {},
  setEstimatedTotal: (total: number) => {},
  setEstimatedShipDate: (date: Date) => {},
  setKeyThiccPoints: (points: number) => {},
  setKeyboard: (keyboard: Product & { _id: string }) => {},
  setKeyboardSize: (size: string) => {},
  setKeycaps: (keycaps: Product & { _id: string }) => {},
  setSwitches: (switches: Product & { _id: string }) => {},
  setColor: (color: Color & { _id: string }) => {},
  setAccount: (account: Account & { _id: string }) => {},
};

export const BuilderContext = createContext(initState);

const BuilderProvider = ({ children, baseKeyboard }: BuilderProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [estimatedShipDate, setEstimatedShipDate] = useState(new Date());
  const [keyThiccPoints, setKeyThiccPoints] = useState(0);
  const [keyboard, setKeyboardStore] = useState<Product | null>(baseKeyboard);
  const [keycaps, setKeycapsStore] = useState<Product | null>(null);
  const [switches, setSwitchesStore] = useState<Product | null>(null);
  const [builderResult, setBuilderResult] = useState<Builder>({
    baseKeyboard: baseKeyboard,
    keycaps: undefined,
    switches: undefined,
    builder: undefined,
    keyboardCase: undefined,
    keyboardColor: undefined,
    keyboardSize: "",
    totalPrice: 0,
  });
  const [color, setColorStore] = useState<Color | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  const setStage = (stage: number) => {
    setCurrentStage(stage);
  };

  const setKeyboard = (keyboard: Product & { _id: string }) => {
    setKeyboardStore(keyboard);
    setBuilderResult({
      ...builderResult,
      baseKeyboard: keyboard,
    });
  };

  const setKeyboardSize = (size: string) => {
    setBuilderResult({
      ...builderResult,
      keyboardSize: size,
    });
  }

  const setKeycaps = (keycaps: Product & { _id: string }) => {
    setKeycapsStore(keycaps);
    setBuilderResult({
      ...builderResult,
      keycaps: keycaps,
    });
  };

  const setSwitches = (switches: Product & { _id: string }) => {
    setSwitchesStore(switches);
    setBuilderResult({
      ...builderResult,
      switches: switches,
    });
  };

  const setColor = (color: Color & { _id: string }) => {
    setColorStore(color);
    setBuilderResult({
      ...builderResult,
      keyboardColor: color,
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        currentStage,
        estimatedTotal,
        estimatedShipDate,
        keyThiccPoints,
        keyboard,
        keycaps,
        switches,
        builderResult,
        color,
        account,
        setStage,
        setEstimatedTotal,
        setEstimatedShipDate,
        setKeyThiccPoints,
        setKeyboard,
        setKeyboardSize,
        setKeycaps,
        setSwitches,
        setColor,
        setAccount,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
