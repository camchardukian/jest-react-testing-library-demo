import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry(props) {
  const [orderDetails] = useOrderDetails();
  const { onSetOrderPhase } = props;

  return (
    <div className="order-entry-page">
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => onSetOrderPhase(1)}>Order Sundae!</button>
    </div>
  );
}
