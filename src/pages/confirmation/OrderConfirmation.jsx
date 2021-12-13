import axios from "axios";
import { useEffect, useState } from "react";
import AlertBanner from "../common/AlertBanner";
import "./styles.scss";

const OrderConfirmation = (props) => {
  const { onSetOrderPhase } = props;
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));
  }, []);
  console.log("errror", error);
  if (error) {
    return <AlertBanner />;
  }
  return (
    <div className="order-confirmation-page">
      {orderNumber ? (
        <>
          <h1>Thank you</h1>
          <h2>Your order number is: {orderNumber}</h2>
          <h4>As per our terms and conditions nothing will happen now</h4>
          <button onClick={() => onSetOrderPhase(0)}>Create new order</button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrderConfirmation;
