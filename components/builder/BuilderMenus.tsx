import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";
// mock datas
import {
  baseplateTypes,
  keyboardSizes,
  keyboardColors,
  keycaps,
  switches,
} from "./mockData";

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
  const { setKeycaps, setKeyboardKeycapMock, builderResult } =
    useContext(BuilderContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4">
        {keycaps.map((keycap) => (
          <button
            key={keycap.name}
            onClick={() => {
              setKeyboardKeycapMock(keycap);
            }}
            className={`rounded-full w-16 h-16  ${
              builderResult?.keyboardKeycapMock === keycap.name
                ? "border-yellow-500 border-4"
                : ""
            }`}
            style={{
              background: `linear-gradient(to bottom, ${keycap.colorStart}, ${keycap.colorEnd})`,
            }}
          />
        ))}
      </div>

      {builderResult?.keyboardKeycapMock && (
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold text-white">
            {
              keycaps.find(
                (keycap) => builderResult?.keyboardKeycapMock === keycap.name
              )?.name
            }
          </span>

          <span className=" text-white">
            Rp
            {keycaps
              .find(
                (keycap) => builderResult?.keyboardKeycapMock === keycap.name
              )
              ?.price.toLocaleString()}
          </span>

          <span className="text-white">
            {
              keycaps.find(
                (keycap) => builderResult?.keyboardKeycapMock === keycap.name
              )?.description
            }
          </span>

          <ul className="list-disc list-inside">
            <li className="text-white">
              Profile:{" "}
              {
                keycaps.find(
                  (keycap) => builderResult?.keyboardKeycapMock === keycap.name
                )?.profile
              }
            </li>
            <li className="text-white">
              Material:{" "}
              {
                keycaps.find(
                  (keycap) => builderResult?.keyboardKeycapMock === keycap.name
                )?.material
              }
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export const Switches = () => {
  const { setSwitches, setKeyboardSwitchMock, builderResult } =
    useContext(BuilderContext);

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-white">LINEAR</span>
      <div className="grid grid-cols-4">
        {switches
          .filter((switchItem) => switchItem.type.toLowerCase() === "linear")
          .map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setKeyboardSwitchMock(item);
              }}
              className={`rounded-xl w-16 h-16  ${
                builderResult?.keyboardSwitchMock === item.name
                  ? "border-yellow-500 border-4"
                  : ""
              }`}
              style={{
                background: item.color,
              }}
            />
          ))}
      </div>

      <span className="font-bold text-white">TACTILE</span>
      <div className="grid grid-cols-4">
        {switches
          .filter((switchItem) => switchItem.type.toLowerCase() === "tactile")
          .map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setKeyboardSwitchMock(item);
              }}
              className={`rounded-xl w-16 h-16  ${
                builderResult?.keyboardSwitchMock === item.name
                  ? "border-yellow-500 border-4"
                  : ""
              }`}
              style={{
                background: item.color,
              }}
            />
          ))}
      </div>

      <span className="font-bold text-white">CLICKY</span>
      <div className="grid grid-cols-4">
        {switches
          .filter((switchItem) => switchItem.type.toLowerCase() === "clicky")
          .map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setKeyboardSwitchMock(item);
              }}
              className={`rounded-xl w-16 h-16  ${
                builderResult?.keyboardSwitchMock === item.name
                  ? "border-yellow-500 border-4"
                  : ""
              }`}
              style={{
                background: item.color,
              }}
            />
          ))}
      </div>

      {builderResult?.keyboardSwitchMock && (
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold text-white">
            {
              switches.find(
                (item) => builderResult?.keyboardSwitchMock === item.name
              )?.name
            }
          </span>

          <span className=" text-white">
            Rp
            {switches
              .find((item) => builderResult?.keyboardSwitchMock === item.name)
              ?.price.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export const Review = () => {
  const {
    builderResult,
    basePrice,
    mockCaseStore,
    mockColorStore,
    mockKeycapStore,
    mockSizeStore,
    mockSwitchStore,
  } = useContext(BuilderContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div
          className="h-16 w-16 rounded-lg"
          style={{
            background: keyboardColors.find(
              (color) => color.name === mockColorStore.name
            )?.code,
          }}
        />
        <div className="flex flex-col text-white">
          {/* @ts-ignore */}
          <span className="text-xl">{builderResult!.baseKeyboard!.name}</span>
          <span>{mockCaseStore.name}</span>
          <span>{mockColorStore.name}</span>
          <span>{mockSizeStore.name}</span>

          <span>
            Rp
            {(
              basePrice +
              mockCaseStore.price +
              mockColorStore.price +
              mockSizeStore.price
            ).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="h-16 w-16 rounded-lg"
          style={{
            background: `linear-gradient(to bottom, ${
              keycaps.find((keycap) => keycap.name === mockKeycapStore.name)
                ?.colorStart
            }, ${
              keycaps.find((keycap) => keycap.name === mockKeycapStore.name)
                ?.colorEnd
            })`,
          }}
        />
        <div className="flex flex-col text-white">
          <span className="text-xl">{builderResult!.keyboardKeycapMock}</span>
          <span>Rp{mockKeycapStore.price.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="h-16 w-16 rounded-lg"
          style={{
            background: switches.find(
              (switchItem) => switchItem.name === mockSwitchStore.name
            )?.color,
          }}
        />
        <div className="flex flex-col text-white">
          <span className="text-xl">{builderResult!.keyboardSwitchMock}</span>
          <span>Rp{mockSwitchStore.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
