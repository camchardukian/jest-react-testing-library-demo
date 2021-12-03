import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <OrderDetailsProvider>
        <OrderEntry />
        <SummaryForm />
      </OrderDetailsProvider>
    </div>
  );
};

export default App;
