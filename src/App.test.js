import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand text", () => {
  render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  const brandElement = screen.getAllByText(/Paktolus Casino/i);
  expect(brandElement.length).toBe(2);
});
