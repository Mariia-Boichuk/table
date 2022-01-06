import "./App.css";
import { useContext, useState } from "react";
import { MatrixContext } from "./context/MatrixContextProvider";
import { Table } from "./components/Table";
import { ClosevalsContext } from "./context/ClosevalsContextProvider";

function App() {
  const { dispatch, matrix } = useContext(MatrixContext);
  const { x, setx } = useContext(ClosevalsContext);
  const [m, setm] = useState(5);
  const [n, setn] = useState(3);
  const [rowToDel, setrowToDel] = useState(2);
  return (
    <div className="App">
      <label>rows (m)</label>
      <input type="number" onChange={(e) => setm(e.target.value)} value={m} />

      <label>columns (n)</label>
      <input type="number" onChange={(e) => setn(e.target.value)} value={n} />
      <label>X</label>
      <input type="number" onChange={(e) => setx(e.target.value)} value={x} />

      <button
        onClick={() => dispatch({ type: "CREATE_MATRIX", payload: { m, n } })}
      >
        crete matrix
      </button>

      <button
        onClick={() => dispatch({ type: "DELETE_ROW", payload: { rowToDel } })}
      >
        delete row
      </button>
      <input
        type="number"
        onChange={(e) => setrowToDel(e.target.value)}
        value={rowToDel}
      />

      <button onClick={() => dispatch({ type: "ADD_ROW", payload: { m, n } })}>
        add row
      </button>
      {matrix.length !== 0 && <Table />}
    </div>
  );
}

export default App;
