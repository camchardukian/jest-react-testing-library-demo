import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("It displays an image (from the server) for each scoop", async () => {
  render(<Options optionType={"scoops"} />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of the images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
