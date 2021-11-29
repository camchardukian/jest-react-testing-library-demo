import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { SCOOPS_TOTAL_LABEL } from "../../../utils/constants";

test("subtotal default value is zero", () => {
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText(SCOOPS_TOTAL_LABEL, { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
});

test("update scoops subtotal when quantity or type of scoops change", async () => {
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText(SCOOPS_TOTAL_LABEL, { exact: false });

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
