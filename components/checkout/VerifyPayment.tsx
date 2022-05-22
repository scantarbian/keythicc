import { useContext, useRef, useEffect } from "react";
import { CartContext } from "contexts/CartContext";

type Props = {
  className?: string;
};

const VerifyPayment = ({ className }: Props) => {
  const { iframeUrl } = useContext(CartContext);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // listen to message from window
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data) {
        console.log("message", event.data);
      }
    });
  }, []);

  return (
    <div className={className}>
      <iframe
        src={iframeUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        ref={iframeRef}
      />
    </div>
  );
};

export default VerifyPayment;
