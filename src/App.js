import "./App.css";
import { useMemo } from "react";
function App() {
  console.log("matrix");

  const matrix = useMemo(() => {
    const m = 3,
      n = 4;
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
  }, []);

  const rowsSum = useMemo(() => {
    return matrix.map(function (row) {
      return row.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
    });
  }, [matrix]);
  const columnsSum = useMemo(() => {
    return matrix.reduce(function (row, ind) {
      ind.forEach(function (el, i) {
        row[i] = (row[i] || 0) + el.amount;
      });
      return row;
    }, []);
  }, [matrix]);

  console.log(matrix, rowsSum);
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
