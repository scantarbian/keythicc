import { createContext, ReactNode, useState } from "react";

type BuilderProps = {
  children: ReactNode;
};

const initState = {
  currentStage: 0,
  estimatedTotal: 0,
  estimatedShipDate: new Date(),
  keyThiccPoints: 0,
  setStage: (stage: number) => {},
};

export const BuilderContext = createContext(initState);

const BuilderProvider = ({ children }: BuilderProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [estimatedShipDate, setEstimatedShipDate] = useState(new Date());
  const [keyThiccPoints, setKeyThiccPoints] = useState(0);

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
        setStage,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
