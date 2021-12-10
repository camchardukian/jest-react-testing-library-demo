import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

import {
  SCOOPS_SUBTOTAL_LABEL,
  TOPPINGS_SUBTOTAL_LABEL,
} from "../../../utils/constants";

describe("scoops subtotal", () => {
  test("update scoops subtotal when quantity or type of scoops change", async () => {
    render(<Options optionType="scoops" />);
    const scoopsSubtotal = screen.getByText(SCOOPS_SUBTOTAL_LABEL, {
      exact: false,
    });

    // Ensures scoops subtotal starts at "0.00"
    expect(scoopsSubtotal).toHaveTextContent("0.00");

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
});

describe("toppings subtotal", () => {
  test("update toppings subtotal when the number of toppings changes", async () => {
    render(<Options optionType="toppings" />);
    const toppingsSubtotal = screen.getByText(TOPPINGS_SUBTOTAL_LABEL, {
      exact: false,
    });

    // Ensures toppings subtotal starts at "0.00"
    expect(toppingsSubtotal).toHaveTextContent("0.00");

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
});

describe("grand total", () => {
  test("grand total is updated properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    // Ensures grandTotal starts at "$0.00"
    expect(grandTotal).toHaveTextContent("$0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("$2.00");

    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    expect(hotFudgeInput).not.toBeChecked();
    userEvent.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();

    expect(grandTotal).toHaveTextContent("$3.50");
  });

  test("grand total is updated properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    expect(hotFudgeInput).not.toBeChecked();
    userEvent.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();
    expect(grandTotal).toHaveTextContent("$1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("$3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("$4.00");

    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    expect(hotFudgeInput).not.toBeChecked();
    userEvent.click(hotFudgeInput);
    expect(hotFudgeInput).toBeChecked();

    expect(grandTotal).toHaveTextContent("$5.50");

    // Remove the hot fudge topping and ensure the grandTotal decreased
    userEvent.click(hotFudgeInput);
    expect(hotFudgeInput).not.toBeChecked();
    expect(grandTotal).toHaveTextContent("$4.00");

    // Remove one of the scoops of ice cream and ensure the grandTotal decreased
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("$2.00");
  });
});
