import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //   @TODO -- Handle error response
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });
  return <div>{optionItems}</div>;
}
