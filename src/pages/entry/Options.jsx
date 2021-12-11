import { useEffect, useState } from "react";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { PRICE_PER_ITEM } from "../../utils/constants";
import Helpers from "../../utils/helpers";
import "./styles.scss";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1);

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={({ itemName, newItemCount }) =>
          updateItemCount({ itemName, newItemCount, optionType })
        }
      />
    );
  });
  return (
    <>
      <h2>{title}</h2>
      <p>for {Helpers.formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <div className="options-list-container">{optionItems}</div>
    </>
  );
}
