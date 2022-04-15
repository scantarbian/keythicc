import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";

type BuilderProps = {
  children: ReactNode;
};

type StateProps = {
  currentStage: number;
  estimatedTotal: number;
  estimatedShipDate: Date;
  keyThiccPoints: number;
  keyboard:
    | (Product & {
        _id: string;
      })
    | null;
  keycaps:
    | (Product & {
        _id: string;
      })
    | null;
  switches:
    | (Product & {
        _id: string;
      })
    | null;
  setStage: (stage: number) => void;
  setEstimatedTotal: (total: number) => void;
  setEstimatedShipDate: (date: Date) => void;
  setKeyThiccPoints: (points: number) => void;
  setKeyboard: (keyboard: Product & { _id: string }) => void;
  setKeycaps: (keycaps: Product & { _id: string }) => void;
  setSwitches: (switches: Product & { _id: string }) => void;
};

const initState: StateProps = {
  currentStage: 0,
  estimatedTotal: 0,
  estimatedShipDate: new Date(),
  keyThiccPoints: 0,
  keyboard: null,
  keycaps: null,
  switches: null,
  setStage: (stage: number) => {},
  setEstimatedTotal: (total: number) => {},
  setEstimatedShipDate: (date: Date) => {},
  setKeyThiccPoints: (points: number) => {},
  setKeyboard: (keyboard: Product & { _id: string }) => {},
  setKeycaps: (keycaps: Product & { _id: string }) => {},
  setSwitches: (switches: Product & { _id: string }) => {},
};

export const BuilderContext = createContext(initState);

const BuilderProvider = ({ children }: BuilderProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [estimatedShipDate, setEstimatedShipDate] = useState(new Date());
  const [keyThiccPoints, setKeyThiccPoints] = useState(0);
  const [keyboard, setKeyboard] = useState<(Product & { _id: string }) | null>(
    null
  );
  const [keycaps, setKeycaps] = useState<(Product & { _id: string }) | null>(
    null
  );
  const [switches, setSwitches] = useState<(Product & { _id: string }) | null>(
    null
  );

  const setStage = (stage: number) => {
    setCurrentStage(stage);
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
        setStage,
        setEstimatedTotal,
        setEstimatedShipDate,
        setKeyThiccPoints,
        setKeyboard,
        setKeycaps,
        setSwitches,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
