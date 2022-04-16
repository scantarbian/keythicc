import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";

export const Keyboard = () => {
  const { keyboard, setKeyboardSize, builderResult } =
    useContext(BuilderContext);

  return (
    <div className="flex flex-col gap-y-2 text-white">
      <span className="text-2xl font-bold">{keyboard?.name}</span>
      <span className="uppercase">Keyboard Size</span>
      {keyboard && keyboard.sizes ? (
        keyboard.sizes.map((size, index) => (
          <button key={index} onClick={() => setKeyboardSize(size)}>
            {size}
          </button>
        ))
      ) : (
        <span className="lowercase">Keyboard Size Unavailable</span>
      )}
      <span className="uppercase">Keyboard Color</span>
      <span className="uppercase">Baseplate Type</span>
    </div>
  );
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
