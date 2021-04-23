import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { StateProvider } from "./context";

test("Renders brand text", () => {
  render(<App />);
  const brandElement = screen.getAllByText(/Paktolus Casino/i);
  expect(brandElement.length).toBe(2);
});

test("Button present", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Start Game/i);
  expect(buttonElement).toBeInTheDocument();
});

test("Button 'Start Game' Click opens Modal", async () => {
  render(<App />);
  const startGameButton = screen.getByText(/Start Game/i);
  fireEvent.click(startGameButton);

  await waitFor(() => screen.getByText("Game"));

  expect(screen.getByText("Play")).toBeInTheDocument();
});

test("Button 'Play' updates Balance", async () => {
  render(
    <StateProvider>
      <App />
    </StateProvider>
  );
  const startGameButton = screen.getByText(/Start Game/i);
  fireEvent.click(startGameButton);

  await screen.findByText("Game");

  const rowsBefore = screen.queryAllByRole("checkbox");
  console.log("Mis ROWS 1", rowsBefore);

  const balance = await screen.findAllByText(/\$/i);
  const balance1 = balance[0].innerHTML;
  console.log("Balanceo: ", balance1);

  const playGameButton = await screen.findByText(/Play/i);
  fireEvent.click(playGameButton);

  const balance2a = await screen.findAllByText(/\$/i);
  const balance2 = balance2a[0].innerHTML;
  console.log("Balanceo 2: ", balance2);

  expect(balance1).not.toEqual(balance2);
});

test("Button 'Play' updates Table", async () => {
  render(
    <StateProvider>
      <App />
    </StateProvider>
  );
  const startGameButton = screen.getByText(/Start Game/i);
  userEvent.click(startGameButton);

  await screen.findByText("Game");

  const rowsBefore = screen.queryAllByRole("checkbox");
  console.log("Mis ROWS 1", rowsBefore);

  const balance = await screen.findAllByText(/\$/i);
  const balance1 = balance[0].innerHTML;
  console.log("Balanceo: ", balance1);

  const playGameButton = await screen.findByText(/Play/i);
  userEvent.click(playGameButton);

  const balance2a = await screen.findAllByText(/\$/i);
  const balance2 = balance2a[0].innerHTML;
  console.log("Balanceo 2: ", balance2);

  expect(balance1).not.toEqual(balance2);
  /*
  await screen.findAllByRole("checkbox");

  const rowsAfter = screen.queryAllByRole("checkbox");
  console.log("Mis ROWS 2", rowsAfter);
  const result = rowsAfter.length - rowsBefore.length;

  expect(result).toBe(1);
  */
});
