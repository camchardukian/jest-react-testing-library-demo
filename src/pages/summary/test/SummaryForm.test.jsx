import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import {
  AGREE_TO_TERMS,
  CONFIRM_ORDER,
  TERMS_AND_CONDITIONS,
} from "../../../utils/constants";

test("The button is disabled by default", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", {
    name: CONFIRM_ORDER,
  });
  expect(button).toBeDisabled();
});

test("The checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: AGREE_TO_TERMS,
  });
  expect(checkbox).not.toBeChecked();
});

test("The checkbox's checked property is toggled when clicked", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: AGREE_TO_TERMS,
  });
  expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test("The button is enabled when the checkbox is checked, and disabled when the checkbox is unchecked", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", {
    name: CONFIRM_ORDER,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: AGREE_TO_TERMS,
  });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
});

test("The detailed terms and conditions appear only when the user hovers over the checkbox's label", () => {
  render(<SummaryForm />);
  const agreeToTermsLabel = screen.queryByText(AGREE_TO_TERMS);
  const detailedTermsNull = screen.queryByText(TERMS_AND_CONDITIONS);
  expect(detailedTermsNull).not.toBeInTheDocument();

  userEvent.hover(agreeToTermsLabel);
  const detailedTerms = screen.queryByText(TERMS_AND_CONDITIONS);
  expect(detailedTerms).toBeInTheDocument();

  userEvent.unhover(agreeToTermsLabel);
  const detailedTermsNullAgain = screen.queryByText(TERMS_AND_CONDITIONS);
  expect(detailedTermsNullAgain).not.toBeInTheDocument();
});
