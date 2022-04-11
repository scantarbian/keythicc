import { useContext } from "react";
import { format } from "date-fns";
import { BuilderContext } from "contexts/BuilderContext";

type Props = {
  className?: string;
};

const BuilderFooter = ({ className }: Props) => {
  const {
    setStage,
    currentStage,
    estimatedShipDate,
    estimatedTotal,
    keyThiccPoints,
  } = useContext(BuilderContext);

  return (
    <div
      className={`grid grid-cols-5 w-full gap-x-20 bg-white ${className} p-10`}
    >
      <button
        className={` text-white font-bold text-2xl p-4 ${
          currentStage === 0 ? "bg-special-grey-2" : "bg-black"
        }`}
        disabled={currentStage === 0}
        onClick={() => setStage(currentStage - 1)}
      >
        PREVIOUS
      </button>
      <div className="col-span-3 divide-x-2 divide-black flex justify-between">
        <div className="flex flex-col items-center flex-1 justify-between">
          <span className="font-bold text-2xl">
            Rp{estimatedTotal.toLocaleString()}
          </span>
          <span>Estimated Total</span>
        </div>
        <div className="flex flex-col items-center flex-1 justify-between">
          <span className="font-bold text-2xl">
            {format(estimatedShipDate, "MMMM yyyy")}
          </span>
          <span>Estimated Ship Date</span>
        </div>
        <div className="flex flex-col items-center flex-1 justify-between">
          <span className="font-bold text-2xl">{keyThiccPoints}</span>
          <span>KeyThicc Points</span>
        </div>
      </div>
      {currentStage !== 3 ? (
        <button
          className="bg-black text-white font-bold text-2xl p-4"
          onClick={() => setStage(currentStage + 1)}
        >
          NEXT
        </button>
      ) : (
        <button className="bg-orange-400 text-white font-bold text-2xl p-4">
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default BuilderFooter;
