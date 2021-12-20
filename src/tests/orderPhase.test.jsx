import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);
  // add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesInput);

  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeInput);

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  userEvent.click(orderButton);
  // check summary information based on order
  const scoopsPrice = screen.queryByText("Scoops: $6.00");
  expect(scoopsPrice).toBeInTheDocument();
  const vanillaScoop = screen.queryByText("1 Vanilla");
  expect(vanillaScoop).toBeInTheDocument();
  const chocolateScoops = screen.queryByText("2 Chocolate");
  expect(chocolateScoops).toBeInTheDocument();

  const toppingsPrice = screen.queryByText("Toppings: $3.00");
  expect(toppingsPrice).toBeInTheDocument();
  const cherryTopping = screen.queryByText("Cherries");
  expect(cherryTopping).toBeInTheDocument();
  const hotFudgeTopping = screen.queryByText("Hot fudge");
  expect(hotFudgeTopping).toBeInTheDocument();
  // accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox");
  userEvent.click(termsCheckbox);
  const confirmOrderBtn = screen.getByRole("button", {
    name: "Confirm order",
  });
  userEvent.click(confirmOrderBtn);

  // confirm "loading..." text appears until server returns order number.
  const loadingText = screen.getByText("Loading...");
  expect(loadingText).toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumberHeading = await screen.findByRole("heading", {
    name: /^Your order number is:/,
  });
  expect(orderNumberHeading).toHaveTextContent(
    "Your order number is: 32423423443"
  );

  // confirm "loading..." text has disappeared after the server's response has been received.
  expect(loadingText).not.toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderBtn = screen.getByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderBtn);
  // check that scoops and toppings subtotals have been reset + await response from server to avoid test errors
  const vanillaInput2 = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const cherriesInput2 = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  const scoopsSubtotal = screen.queryByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
  const toppingsSubtotal = screen.queryByText("Toppings total: $0.00");
  expect(toppingsSubtotal).toBeInTheDocument();
});
