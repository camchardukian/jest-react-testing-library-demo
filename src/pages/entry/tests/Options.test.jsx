import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("It displays an image (from the server) for each scoop type", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of the images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("It displays an image (from the server) for each topping type", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of the images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("It does not update the subtotal for invalid scoop input values", async () => {
  render(<Options optionType="scoops" updateItemCount={jest.fn()} />);

  // // find images
  // const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  // expect(scoopImages).toHaveLength(2);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // check default scoopSubtotal value
  const scoopSubtotal = screen.getByText("Scoops total:", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("Scoops total: $0.00");

  // negative number value should result in error class being applied
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("input-error");

  // invalid input should not change the scoops subtotal from its default
  expect(scoopSubtotal).toHaveTextContent("Scoops total: $0.00");
});
