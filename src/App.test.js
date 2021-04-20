import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

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

// test("Button 'Play' updates UI", async () => {
//   render(<App />);
//   const startGameButton = screen.getByText(/Start Game/i);
//   fireEvent.click(startGameButton);

//   await waitFor(() => screen.getByText("Game"));

//   const playGameButton = screen.getByText(/Play/i);
//   fireEvent.click(playGameButton);

//   //expect(screen.getByText("Play")).toBeInTheDocument();
// });
