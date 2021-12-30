import "./App.css";
import { useMemo, useState } from "react";
import { Table } from "./components/Table";

const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];

    for (let j = 0; j < n; j++) {
      const cellValue = Math.floor(Math.random() * (999 - 100) + 100);

      result[i][j] = {
        id: Symbol(),
        amount: cellValue,
      };
    }
  }

  return result;
};

function App() {
  const [m, setm] = useState(2);
  const [n, setn] = useState(3);

  const matrix = useMemo(() => genMatrix(m, n), [m, n]);
  const rowsSum = useMemo(() => {
    return matrix.map((row) => {
      return row.reduce((a, b) => {
        return a + b.amount;
      }, 0);
    });
  }, [matrix]);

  const columnsSum = useMemo(() => {
    return matrix.reduce((row, ind) => {
      ind.forEach((el, i) => {
        row[i] = (row[i] || 0) + el.amount;
      });
      return row;
    }, []);
  }, [matrix]);

  return (
    <div className="App">
      <label>rows (m)</label>
      <input type="number" onChange={(e) => setm(e.target.value)} value={m} />

      <label>columns (n)</label>
      <input type="number" onChange={(e) => setn(e.target.value)} value={n} />

      <Table matrix={matrix} columnsSum={columnsSum} rowsSum={rowsSum} />
    </div>
  );
}

export default App;
