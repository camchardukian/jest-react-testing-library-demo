import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry(props) {
  const [orderDetails] = useOrderDetails();
  const { onSetOrderPhase } = props;
  const hasSomeScoopsSelected = Array.from(orderDetails.scoops)
    .map((item) => item[1])
    .some((item) => item);

  return (
    <div className="order-entry-page">
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button
        onClick={() => onSetOrderPhase(1)}
        disabled={!hasSomeScoopsSelected}
      >
        Order Sundae!
      </button>
    </div>
  );
}
