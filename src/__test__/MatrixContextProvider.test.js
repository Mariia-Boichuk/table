import React, { useState, useContext, createContext } from "react";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatrixContextProvider } from "../context/MatrixContextProvider";
import { Table } from "../components/Table";
import { InputsPanel } from "../components/InputsPanel";

let getAllByRole;
beforeEach(() => {
  getAllByRole = render(
    <MatrixContextProvider>
      <InputsPanel />
      <Table />
    </MatrixContextProvider>
  ).getAllByRole;
});

describe("Context", () => {
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
    const rows = getAllByRole("row");
    expect(rows.length).toBe(3);
  });
});

it("adds row to table", () => {
  const rowsnumberInput = screen.getByTestId("rows-input");
  fireEvent.change(rowsnumberInput, { target: { value: "2" } });

  const buttonElement = screen.getByText(/crete matrix/i);
  const buttonElementadd = screen.getByText(/add row/i);

  fireEvent.click(buttonElement);
  fireEvent.click(buttonElementadd);
  const rows = getAllByRole("row");
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
  expect(+myCells[0].textContent).toBeGreaterThan(99);
  expect(+myCells[0].textContent).toBeLessThan(1000);
});

it("should increment cell value after clicking on cell", () => {
  const buttonElement = screen.getByText(/crete matrix/i);
  fireEvent.click(buttonElement);

  const myCell = screen.getByTestId("cell00");
  const cellValue = +myCell.textContent;
  userEvent.click(myCell);

  expect(+myCell.textContent).toBe(cellValue + 1);
});
