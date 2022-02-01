import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TableCell } from "../components/TableCell";

describe("testing cell value", () => {
  it("renders percentage instead of value", () => {
    render(
      <TableCell
        className="main-cell"
        val="499"
        valuePercent="23%"
        rowHovered={true}
      />
    );
    const cell = screen.getByRole("cell");
    expect(cell.textContent).toBe("23%");
  });

  it("renders right value in cell", () => {
    render(
      <TableCell
        className="main-cell"
        val={856}
        valuePercent="43%"
        rowHovered={false}
        rowIndex={2}
        columnIndex={2}
        highlightCell={false}
      />
    );
    const cell = screen.getByRole("cell");
    expect(cell.textContent).toBe("856");

    fireEvent.click(cell);
  });
});

describe("testing cell class", () => {
  it("class is right for highlighted cell", () => {
    render(
      <TableCell
        className="main-cell"
        val="876"
        valuePercent="43%"
        rowHovered={false}
        rowIndex={2}
        columnIndex={2}
        highlightCell={true}
      />
    );
    const cell = screen.getByRole("cell");
    expect(cell).toHaveClass("hilight");
    expect(cell).not.toHaveClass("percentage");
  });

  it("class is right for cell in hovered row", () => {
    render(
      <TableCell
        className="main-cell"
        val="876"
        valuePercent="43%"
        rowHovered={true}
        rowIndex={2}
        columnIndex={2}
        highlightCell={false}
      />
    );
    const cell = screen.getByRole("cell");
    expect(cell).toHaveClass("percentage");
    expect(cell).toHaveClass("main-cell");
  });
});
