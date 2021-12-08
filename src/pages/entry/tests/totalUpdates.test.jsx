import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import {
  SCOOPS_SUBTOTAL_LABEL,
  TOPPINGS_SUBTOTAL_LABEL,
} from "../../../utils/constants";

test("scoops subtotal default value is zero", () => {
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText(SCOOPS_SUBTOTAL_LABEL, {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
});

test("update scoops subtotal when quantity or type of scoops change", async () => {
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText(SCOOPS_SUBTOTAL_LABEL, {
    exact: false,
  });

  // update number of vanilla scoops to 1 and check the scoopsSubtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update number of chocolate scoops to 2 and check the scoopsSubtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("toppings subtotal default value is zero", () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText(TOPPINGS_SUBTOTAL_LABEL, {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});

test("update toppings subtotal when the number of toppings changes", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText(TOPPINGS_SUBTOTAL_LABEL, {
    exact: false,
  });

  // check the "Cherries" topping and ensure the subtotal is correct.
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesInput).not.toBeChecked();
  userEvent.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // Check the "Gummi bears" topping and ensure the subtotal is correct.
  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  expect(hotFudgeInput).not.toBeChecked();
  userEvent.click(hotFudgeInput);
  expect(hotFudgeInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // Uncheck the "Cherries" topping and ensure the subtotal is correct.
  userEvent.click(cherriesInput);
  expect(cherriesInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
