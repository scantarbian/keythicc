import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";

export const Keyboard = () => {
  const { keyboard } = useContext(BuilderContext);

  return <></>;
};

export const Keycaps = () => {
  const { setKeycaps } = useContext(BuilderContext);

  return <></>;
};

export const Switches = () => {
  const { setSwitches } = useContext(BuilderContext);

  return <></>;
};

export const Review = () => {
  return <></>;
};
