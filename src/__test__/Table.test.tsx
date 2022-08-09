import { render, screen } from "@testing-library/react";
import { MatrixContext } from "../context/MatrixContextProvider";
import { Table } from "../components/Table";
import { mockValue } from "../__data__/mockMatrix";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import closeValues from "../__data__/closeValues";

describe("Context", () => {
  it("renders table with 10 rows (last row average value of each column)", () => {
    render(
      <MatrixContext.Provider value={mockValue}>
        <ClosevalsContext.Provider value={closeValues}>
          <Table />
        </ClosevalsContext.Provider>
      </MatrixContext.Provider>
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(10);
  });

  it("should have cell with value 710", () => {
    render(
      <MatrixContext.Provider value={mockValue}>
        <ClosevalsContext.Provider value={closeValues}>
          <Table />
        </ClosevalsContext.Provider>
      </MatrixContext.Provider>
    );

    const cell = screen.getByRole("cell", { name: "710" });
    expect(cell).toBeInTheDocument();
  });

  it("should have tbody", () => {
    render(
      <MatrixContext.Provider value={mockValue}>
        <ClosevalsContext.Provider value={closeValues}>
          <Table />
        </ClosevalsContext.Provider>
      </MatrixContext.Provider>
    );

    const table = screen.getByRole("table");
    expect(table).toContainHTML("tbody");
  });

  it("should have cell with value sum of the row", () => {
    render(
      <MatrixContext.Provider value={mockValue}>
        <ClosevalsContext.Provider value={closeValues}>
          <Table />
        </ClosevalsContext.Provider>
      </MatrixContext.Provider>
    );

    const cell = screen.getByText(`${951 + 350 + 315 + 366}`);
    expect(cell).toBeInTheDocument();
  });

  it("should hilight properly", () => {
    render(
      <MatrixContext.Provider value={mockValue}>
        <ClosevalsContext.Provider value={closeValues}>
          <Table />
        </ClosevalsContext.Provider>
      </MatrixContext.Provider>
    );

    const cell = screen.getByText(229);
    expect(cell).toHaveClass("hilight");
    const cell2 = screen.getByText(219);
    expect(cell2).toHaveClass("hilight");
  });
});
