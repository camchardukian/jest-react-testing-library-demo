import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("The button is disabled by default", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", {
    name: "Confirm order",
  });
  expect(button).toBeDisabled();
});

test("The checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the terms and conditions",
  });
  expect(checkbox).not.toBeChecked();
});

test("The checkbox's checked property is toggled when clicked", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the terms and conditions",
  });
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test("The button is enabled when the checkbox is checked, and disabled when the checkbox is unchecked", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", {
    name: "Confirm order",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the terms and conditions",
  });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
});
