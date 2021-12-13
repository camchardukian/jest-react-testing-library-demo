import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
const OrderSummary = (props) => {
  const [orderDetails] = useOrderDetails();
  const { onSetOrderPhase } = props;

  return (
    <div className="order-summary-container">
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      {orderDetails.scoops.size > 0 && (
        <ul className="details-list">
          {[...orderDetails.scoops.entries()].map((scoop) => {
            return (
              <li>
                {`${scoop[1]} `}
                {scoop[0]}
              </li>
            );
          })}
        </ul>
      )}
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      {orderDetails.toppings.size > 0 && (
        <ul className="details-list">
          {[...orderDetails.toppings.entries()].map((topping) => {
            return <li>{topping[0]}</li>;
          })}
        </ul>
      )}
      <SummaryForm onSetOrderPhase={onSetOrderPhase} />
    </div>
  );
};

export default OrderSummary;
