import "./App.css";
import React, { useContext, useState } from "react";
import { MatrixContext } from "./context/MatrixContextProvider";
import { Table } from "./components/Table";

const App:React.FC=()=> {
  const { dispatch, matrix } = useContext(MatrixContext);

  const [m, setm] = useState<string|number>(100);
  const [n, setn] = useState<string|number>(100);
  const [x, setx] = useState<string|number>(800);
  return (
    <div className="App">
      <label>rows (m)</label>
      <input type="number" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setm(e.target.value)} value={m} />

      <label>columns (n)</label>
      <input type="number" onChange={(e) => setn(e.target.value)} value={n} />
      <label>X</label>
      <input type="number" onChange={(e) => setx(e.target.value)} value={x} />

      <button
        onClick={() => dispatch({ type: "CREATE_MATRIX", payload: { m, n } })}
      >
        crete matrix
      </button>

      <button onClick={() => dispatch({ type: "ADD_ROW", payload: { m, n } })}>
        add row
      </button>
      {matrix.length !== 0 && <Table x={x} />}
    </div>
  );
}

export default App;
