import "./App.css";
import { useMemo } from "react";

const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];

    for (let j = 0; j < n; j++) {
      const cellValue = Math.floor(Math.random() * 1000);

      result[i][j] = {
        id: Symbol(),
        amount: cellValue,
      };
    }
  }

  return result;
};

function App() {
  const matrix = useMemo(() => genMatrix(3, 4), []);
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
      <p>table</p>

      <table className="wrapper">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => {
                return <td key={j}>{col.amount}</td>;
              })}
              <td className="aside">{rowsSum[i]}</td>
            </tr>
          ))}
          {columnsSum.map((el) => (
            <td className="below">{el}</td>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
