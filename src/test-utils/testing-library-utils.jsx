import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything from React Testing Library
export * from "@testing-library/react";

// override React Testing Library's default render method
export { renderWithContext as render };
