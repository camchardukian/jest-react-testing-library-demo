import { useState } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import "./app.styles.scss";
const App = () => {
  const [orderPhase, setOrderPhase] = useState(0);
  const handleSetOrderPhase = (phaseNumber) => {
    setOrderPhase(phaseNumber);
  };
  return (
    <div className="App">
      <OrderDetailsProvider>
        {orderPhase === 0 && (
          <OrderEntry onSetOrderPhase={handleSetOrderPhase} />
        )}
        {orderPhase === 1 && (
          <OrderSummary onSetOrderPhase={handleSetOrderPhase} />
        )}
        {orderPhase === 2 && (
          <OrderConfirmation onSetOrderPhase={handleSetOrderPhase} />
        )}
      </OrderDetailsProvider>
    </div>
  );
};

export default App;
