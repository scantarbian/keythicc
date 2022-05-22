import { useContext } from "react";
import { BuilderContext } from "contexts/BuilderContext";
// components
import { Keyboard, Keycaps, Review, Switches } from "./BuilderMenus";

type Props = {
  className?: string;
};

const BuilderMain = ({ className }: Props) => {
  const { currentStage } = useContext(BuilderContext);

  // use switch case on current stage to render different content
  const Menu = () => {
    switch (currentStage) {
      case 0:
        return <Keyboard />;
      case 1:
        return <Keycaps />;
      case 2:
        return <Switches />;
      case 3:
        return <Review />;
      default:
        return <Keyboard />;
    }
  };

  return (
    <div className={`grid grid-cols-5 w-full gap-x-20 ${className} p-10`}>
      <div className="col-span-4 text-white text-center">
        CANVAS (WORK IN PROGESS)
      </div>
      <div className="col-span-1">{Menu()}</div>
    </div>
  );
};

export default BuilderMain;
