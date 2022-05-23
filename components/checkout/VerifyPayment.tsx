import { useContext, useEffect } from "react";
import { CartContext } from "contexts/CartContext";

type Props = {
  className?: string;
};

const VerifyPayment = ({ className }: Props) => {
  const { iframeUrl, setPhase, orderId } = useContext(CartContext);

  // listen to message from window
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.status_code) {
        if (event.data.status_code === "200") {
          fetch("/api/order", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: orderId,
              transactionStatus: event.data.transaction_status,
            }),
          }).then((res) => {
            // TO-DO: call Shipper order API to create order here
            // fetch("/api/shipper/order", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //   })
            // }).then((res) => {
            //   setPhase("success");
            // });
            setPhase("success");
          });
        }
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
      />
    </div>
  );
};

export default VerifyPayment;
