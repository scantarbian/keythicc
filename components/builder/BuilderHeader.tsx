import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";
import Link from "next/link";

type Props = {
  className?: string;
};

const Stages = ["Keyboard", "Keycaps", "Switches", "Review"];

const BuilderHeader = ({ className }: Props) => {
  const { setStage, currentStage } = useContext(BuilderContext);

  return (
    <div className={`grid grid-cols-5 w-full gap-x-20 items-end ${className}`}>
      <div className="text-white flex flex-col">
        <span className="font-bold text-4xl">Builder</span>
        <span>
          by{" "}
          <Link href="/">
            <a className="font-bold">KeyThicc</a>
          </Link>
        </span>
      </div>
      <div className="flex gap-x-4 flex-1 col-span-3">
        {Stages.map((stage, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-4 w-1/4">
              <span className="text-lg font-bold text-white">{`${
                index + 1
              }. ${stage}`}</span>
              <button
                className={`${
                  currentStage === index ? "bg-orange-400" : "bg-special-grey-2"
                } p-1 w-full`}
                onClick={() => setStage(index)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span className="text-white text-xl">
          {currentStage !== 3
            ? `SELECT YOUR ${Stages[currentStage].toUpperCase()}`
            : `YOUR KEYBOARD`}
        </span>
        <span className="bg-special-grey-3 p-0.5 w-full" />
      </div>
    </div>
  );
};

export default BuilderHeader;