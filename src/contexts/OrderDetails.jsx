import { createContext, useContext, useState, useMemo } from "react";
import { useEffect } from "react/cjs/react.development";
import { ERROR_MESSAGE, PRICE_PER_ITEM } from "../utils/constants";
import Helpers from "../utils/helpers";

const OrderDetails = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(ERROR_MESSAGE.INVALID_CONTEXT_USAGE);
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * PRICE_PER_ITEM[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = Helpers.formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: Helpers.formatCurrency(scoopsSubtotal),
      toppings: Helpers.formatCurrency(toppingsSubtotal),
      grandTotal: Helpers.formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const resetOrder = () => {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
  };

  const value = useMemo(() => {
    function updateItemCount({ itemName, newItemCount, optionType }) {
      const newOptionCounts = { ...optionCounts };
      //
      if (newItemCount === "") {
        return;
      }
      const newItemCountAsInteger = Number(newItemCount);

      const isValidCountNumber =
        Number.isInteger(newItemCountAsInteger) &&
        newItemCountAsInteger >= 0 &&
        newItemCountAsInteger <= 10;

      // update option count for this item with the new value
      if (isValidCountNumber) {
        const optionCountsMap = optionCounts[optionType];
        optionCountsMap.set(itemName, parseInt(newItemCount));
        setOptionCounts(newOptionCounts);
      }
    }
    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
