import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("It displays an image (from the server) for each scoop type", async () => {
  render(<ScoopOption updateItemCount={jest.fn()} />);

  const vanillaInput = await screen.findByRole("spinbutton");

  // negative number value should result in error class being applied
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("input-error");

  // number value greater than 10 should result in error class being applied
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "15");
  expect(vanillaInput).toHaveClass("input-error");

  // decimal value should result in error class being applied
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3.4");
  expect(vanillaInput).toHaveClass("input-error");

  // Changing the input to be valid again should result in the error class being removed.
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "4");
  expect(vanillaInput).not.toHaveClass("input-error");
});
