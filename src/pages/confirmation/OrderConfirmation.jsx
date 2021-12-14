import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import "./styles.scss";

const OrderConfirmation = (props) => {
  const { onSetOrderPhase } = props;
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  const handleResetOrder = () => {
    resetOrder();
    onSetOrderPhase(0);
  };

  return (
    <div className="order-confirmation-page">
      {orderNumber ? (
        <>
          <h1>Thank you</h1>
          <h2>Your order number is: {orderNumber}</h2>
          <h4>As per our terms and conditions nothing will happen now</h4>
          <button onClick={handleResetOrder}>Create new order</button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrderConfirmation;
