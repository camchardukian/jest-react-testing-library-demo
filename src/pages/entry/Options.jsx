import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";

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
  //   @TODO -- Replace null with ToppingOption once we finish writing the code for the ToppingOption component.
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

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
