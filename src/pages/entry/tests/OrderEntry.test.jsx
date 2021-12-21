import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Order sundae btn is disabled if no scoops of ice cream are added, and enabled when at least one scoop of ice cream has been added", async () => {
  render(<OrderEntry />);

  const orderSundaeBtn = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  expect(orderSundaeBtn).toBeDisabled();

  // Add a scoop and confirm orderSundaeBtn is now enabled.
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderSundaeBtn).toBeEnabled();

  // Remove the scoop and confirm orderSundaeBtn is disabled again.
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderSundaeBtn).toBeDisabled();
});
