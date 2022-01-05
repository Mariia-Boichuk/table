import "./App.css";
import { useContext } from "react";
import { MatrixContext } from "./context/MatrixContextProvider";
import { Table } from "./components/Table";
import { ClosevalsContext } from "./context/ClosevalsContextProvider";

function App() {
  const { n, m, setm, setn, dispatch, matrix } = useContext(MatrixContext);
  const { x, setx } = useContext(ClosevalsContext);

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
      {matrix.length !== 0 && <Table />}
    </div>
  );
}

export default App;
