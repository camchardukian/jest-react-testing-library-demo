import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

test("Error banner is displayed if server returns error", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
