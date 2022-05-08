import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

type Props = {
  className?: string;
};

const VerifyPayment = ({ className }: Props) => {
  const { iframeUrl } = useContext(CartContext);

  return (
    <div className={className}>
      <iframe src={iframeUrl} width="100%" height="100%" frameBorder="0" />
    </div>
  );
};

export default VerifyPayment;
