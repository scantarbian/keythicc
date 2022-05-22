import { createContext, ReactNode, useState } from "react";
import { Product } from "models/Product";
import { Account } from "models/Account";
import { Builder } from "models/Builder";
import { Color } from "models/Color";

type BuilderProps = {
  children: ReactNode;
  baseKeyboard: Product & { _id: string };
};

type BasicMock = {
  name: string;
  price: number;
};

type StateProps = {
  basePrice: number;
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
  setKeycaps: (keycaps: Product & { _id: string }) => void;
  setSwitches: (switches: Product & { _id: string }) => void;
  setColor: (color: Color & { _id: string }) => void;
  setAccount: (account: Account & { _id: string }) => void;
  // mocks
  setKeyboardSize: (size: BasicMock) => void;
  mockCaseStore: BasicMock;
  mockColorStore: BasicMock;
  mockSizeStore: BasicMock;
  mockKeycapStore: BasicMock;
  mockSwitchStore: BasicMock;
  setKeyboardCaseMock: (mock: BasicMock) => void;
  setKeyboardColorMock: (mock: BasicMock) => void;
  setKeyboardKeycapMock: (mock: BasicMock) => void;
  setKeyboardSwitchMock: (mock: BasicMock) => void;
  // setMockCaseStore: (mock: BasicMock) => void;
  // setMockColorStore: (mock: BasicMock) => void;
  // setMockSizeStore: (mock: BasicMock) => void;
};

const initState: StateProps = {
  basePrice: 0,
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
  setKeycaps: (keycaps: Product & { _id: string }) => {},
  setSwitches: (switches: Product & { _id: string }) => {},
  setColor: (color: Color & { _id: string }) => {},
  setAccount: (account: Account & { _id: string }) => {},
  // mocks
  setKeyboardSize: (size: BasicMock) => {},
  setKeyboardCaseMock: (mock: BasicMock) => {},
  setKeyboardColorMock: (mock: BasicMock) => {},
  setKeyboardKeycapMock: (mock: BasicMock) => {},
  setKeyboardSwitchMock: (mock: BasicMock) => {},
  mockCaseStore: {} as BasicMock,
  mockColorStore: {} as BasicMock,
  mockSizeStore: {} as BasicMock,
  mockKeycapStore: {} as BasicMock,
  mockSwitchStore: {} as BasicMock,
  // setMockCaseStore: (mock: BasicMock) => {},
  // setMockColorStore: (mock: BasicMock) => {},
  // setMockSizeStore: (mock: BasicMock) => {},
};

export const BuilderContext = createContext(initState);

const BuilderProvider = ({ children, baseKeyboard }: BuilderProps) => {
  const basePrice = baseKeyboard.basePrice;

  const [currentStage, setCurrentStage] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(basePrice);
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
    keyboardCaseMock: "",
    keyboardColorMock: "",
    keyboardKeycapMock: "",
    keyboardSize: "",
    keyboardSwitchMock: "",
    totalPrice: 0,
  });
  const [color, setColorStore] = useState<Color | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  // mocks
  const [mockCaseStore, setMockCaseStore] = useState<BasicMock>(
    {} as BasicMock
  );
  const [mockColorStore, setMockColorStore] = useState<BasicMock>(
    {} as BasicMock
  );
  const [mockSizeStore, setMockSizeStore] = useState<BasicMock>(
    {} as BasicMock
  );
  const [mockKeycapStore, setMockKeycapStore] = useState<BasicMock>(
    {} as BasicMock
  );
  const [mockSwitchStore, setMockSwitchStore] = useState<BasicMock>(
    {} as BasicMock
  );

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

  const setKeyboardSize = (size: BasicMock) => {
    const total = builderResult.keyboardSize
      ? estimatedTotal - mockSizeStore.price + size.price
      : estimatedTotal + size.price;

    setEstimatedTotal(total);

    setMockSizeStore(size);
    setBuilderResult({
      ...builderResult,
      keyboardSize: size.name,
    });
  };

  const setKeyboardCaseMock = (mock: BasicMock) => {
    const total = builderResult.keyboardCaseMock
      ? estimatedTotal - mockCaseStore.price + mock.price
      : estimatedTotal + mock.price;

    setEstimatedTotal(total);

    setMockCaseStore(mock);
    setBuilderResult({
      ...builderResult,
      keyboardCaseMock: mock.name,
    });
  };

  const setKeyboardColorMock = (mock: BasicMock) => {
    const total = builderResult.keyboardColorMock
      ? estimatedTotal - mockColorStore.price + mock.price
      : estimatedTotal + mock.price;

    setEstimatedTotal(total);

    setMockColorStore(mock);
    setBuilderResult({
      ...builderResult,
      keyboardColorMock: mock.name,
    });
  };

  const setKeyboardKeycapMock = (mock: BasicMock) => {
    const total = builderResult.keyboardKeycapMock
      ? estimatedTotal - mockKeycapStore.price + mock.price
      : estimatedTotal + mock.price;

    setEstimatedTotal(total);

    setMockKeycapStore(mock);
    setBuilderResult({
      ...builderResult,
      keyboardKeycapMock: mock.name,
    });
  };

  const setKeyboardSwitchMock = (mock: BasicMock) => {
    const total = builderResult.keyboardSwitchMock
      ? estimatedTotal - mockSwitchStore.price + mock.price
      : estimatedTotal + mock.price;

    setEstimatedTotal(total);

    setMockSwitchStore(mock);
    setBuilderResult({
      ...builderResult,
      keyboardSwitchMock: mock.name,
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        basePrice,
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
        setKeyboardCaseMock,
        setKeyboardColorMock,
        mockCaseStore,
        mockColorStore,
        mockSizeStore,
        mockKeycapStore,
        setKeyboardKeycapMock,
        setKeyboardSwitchMock,
        mockSwitchStore,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;
