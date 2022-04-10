import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";

// type Props = {
//   currentStage: number;
// };

const Stages = ["Keyboard", "Keycaps", "Switches", "Review"];

export const PhaseIndicator = () => {
  const { setStage, currentStage } = useContext(BuilderContext);

  return (
    <div className="flex gap-x-4 w-full">
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
  );
};
