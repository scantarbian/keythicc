import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";
// mock datas
import { baseplateTypes, keyboardSizes, keyboardColors } from "./mockData"

export const Keyboard = () => {
  const {
    keyboard,
    setKeyboardSize,
    builderResult,
    setKeyboardCaseMock,
    setKeyboardColorMock,
  } = useContext(BuilderContext);

  return (
    <div className="flex flex-col gap-y-2 text-white">
      <span className="text-2xl font-bold">{keyboard?.name}</span>
      <span className="uppercase">Keyboard Size</span>
      <div className="flex gap-4">
        {keyboardSizes.map((size) => (
          <button
            key={size.name}
            onClick={() => {
              setKeyboardSize(size);
            }}
            className={`p-2  ${
              builderResult?.keyboardSize === size.name
                ? "bg-yellow-500 text-black"
                : "bg-special-grey-2"
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
      {/* {keyboard && keyboard.sizes ? (
        keyboard.sizes.map((size, index) => (
          <button key={index} onClick={() => setKeyboardSize(size)}>
            {size}
          </button>
        ))
      ) : (
        <span className="lowercase">Keyboard Size Unavailable</span>
      )} */}
      <span className="uppercase">Keyboard Color</span>
      <div className="flex gap-4">
        {keyboardColors.map((color) => (
          <button
            key={color.name}
            onClick={() => {
              setKeyboardColorMock(color);
            }}
            className="flex flex-col items-center"
          >
            <div
              className={`rounded-full w-16 h-16  ${
                builderResult?.keyboardColorMock === color.name
                  ? "border-yellow-500 border-4"
                  : ""
              }`}
              style={{
                backgroundColor: color.code,
              }}
            />
            <span
              className={`text-center ${
                builderResult?.keyboardColorMock === color.name
                  ? "text-yellow-500"
                  : ""
              }`}
            >
              {color.name}
            </span>
          </button>
        ))}
      </div>
      <span className="uppercase">Baseplate Type</span>
      <div className="flex gap-4">
        {baseplateTypes.map((baseplate) => (
          <button
            key={baseplate.name}
            onClick={() => {
              setKeyboardCaseMock(baseplate);
            }}
            className={`p-2  ${
              builderResult?.keyboardCaseMock === baseplate.name
                ? "bg-yellow-500 text-black"
                : "bg-special-grey-2"
            }`}
          >
            {baseplate.name}
          </button>
        ))}
      </div>
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
