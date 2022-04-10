import { useEffect, useRef, createContext, ReactNode, useState } from "react";

type BuilderProps = {
  children: ReactNode;
};

const initState = {
  currentStage: 0,
  setStage: (stage: number) => {},
};

export const BuilderContext = createContext(initState);

const BuilderProvider = ({ children }: BuilderProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const stageRef = useRef(currentStage);

  useEffect(() => {
    stageRef.current = currentStage;
  }, [currentStage]);

  const setStage = (stage: number) => {
    setCurrentStage(stage);
  };

  return (
    <BuilderContext.Provider
      value={{
        currentStage,

        setStage,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
