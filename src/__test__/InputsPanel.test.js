import { render, screen, fireEvent } from "@testing-library/react";
import { InputsPanel } from "../components/InputsPanel";
import "@testing-library/jest-dom/extend-expect";
let rowsnumberInput;
beforeEach(() => {
  render(<InputsPanel />);
  rowsnumberInput = screen.getByTestId("rows-input");
});

describe("testing input for rows number", () => {
  it("input rows initially equals 5", () => {
    expect(rowsnumberInput.value).toBe("5");
  });

  it("input rows number changes correctly", () => {
    fireEvent.change(rowsnumberInput, { target: { value: "9" } });
    expect(rowsnumberInput.value).toBe("9");
  });
});

it("renders rows (m) label", () => {
  const firstLabel = screen.getByText("rows (m)");
  expect(firstLabel).toBeInTheDocument();
});

it("button add row renders", () => {
  const buttonAdd = screen.getByText(/add row/i);
  expect(buttonAdd).toBeInTheDocument();
});
