import React, { useState, useContext, createContext } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatrixContextProvider } from "../context/MatrixContextProvider";
import { Table } from "../components/Table";
import { InputsPanel } from "../components/InputsPanel";
import { ClosevalsContextProvider } from "../context/ClosevalsContextProvider";

it("highlights 4 cells after hovering on cell", async () => {
  const container = render(
    <MatrixContextProvider>
      <ClosevalsContextProvider>
        <InputsPanel />
        <Table />
      </ClosevalsContextProvider>
    </MatrixContextProvider>
  ).container;
  const rowsnumberInput = screen.getByTestId("rows-input");
  fireEvent.change(rowsnumberInput, { target: { value: "5" } });
  const buttonElement = screen.getByText(/crete matrix/i);
  fireEvent.click(buttonElement);
  const myCell = screen.getByTestId("cell00");
  userEvent.hover(myCell);
  await waitFor(() => {
    const cells = container.querySelectorAll(".hilight");
    expect(cells.length).toBe(4);
    console.log(cells);
  });
});

describe("Context", () => {
  beforeEach(() => {
    render(
      <MatrixContextProvider>
        <InputsPanel />
        <Table />
      </MatrixContextProvider>
    );
  });

  it("renders table with 6 rows after creating matrix with default input values", () => {
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1);
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const rows2 = screen.getAllByRole("row");
    expect(rows2.length).toBe(6);
  });

  it("renders table with 2 after creating matrix value for rows quantity 2", () => {
    const rowsnumberInput = screen.getByTestId("rows-input");
    fireEvent.change(rowsnumberInput, { target: { value: "2" } });
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });

  it("adds row to table", () => {
    const rowsnumberInput = screen.getByTestId("rows-input");
    fireEvent.change(rowsnumberInput, { target: { value: "2" } });
    const buttonElement = screen.getByText(/crete matrix/i);
    const buttonElementadd = screen.getByText(/add row/i);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElementadd);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);
  });

  it("renders proper amount of cells", () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const myCells = screen.getAllByRole("cell");
    expect(myCells.length).toBe(52);
  });

  it("cell value is more then 99 and less then 1000", () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const myCells = screen.getAllByRole("cell");
    expect(Number(myCells[0].textContent)).toBeGreaterThan(99);
    expect(Number(myCells[0].textContent)).toBeLessThan(1000);
  });

  it("should increment cell value after clicking on cell", () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);

    const myCell = screen.getByTestId("cell00");
    const cellValue = Number(myCell.textContent);
    userEvent.click(myCell);

    expect(Number(myCell.textContent)).toBe(cellValue + 1);
  });

  it("should change background of and replace value to percentage of all cells in row when hovering aside cell", async () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const myCell = screen.getByTestId("cell3-1");
    userEvent.hover(myCell);
    await waitFor(() => {
      const myCellmain = screen.getByTestId("cell31");

      expect(myCellmain).toHaveClass("percentage");
    });
  });

  it("should change value to percentage of all cells in row when hovering aside cell", async () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const myCell = screen.getByTestId("cell3-1");

    userEvent.hover(myCell);
    await waitFor(() => {
      const allpers = screen.getAllByText(/%/i);

      expect(allpers.length).toBe(7);
    });
  });

  it("should change value to percentage of all cells in row when hovering aside cell another", async () => {
    const buttonElement = screen.getByText(/crete matrix/i);
    fireEvent.click(buttonElement);
    const myCell = screen.getByTestId("cell3-1");
    const myCellan = screen.getByTestId("cell4-1");

    userEvent.hover(myCell);
    userEvent.hover(myCellan);
    await waitFor(() => {
      const myCellmain = screen.getByTestId("cell31");
      expect(myCellmain).not.toHaveClass("percentage");
    });
  });
});
