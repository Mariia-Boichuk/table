import "./App.css";
import { useContext } from "react";
import { MatrixContext } from "./context/MatrixContextProvider";
import { Table } from "./components/Table";

function App() {
  const { n, m, setm, setn } = useContext(MatrixContext);

  return (
    <div className="App">
      <label>rows (m)</label>
      <input type="number" onChange={(e) => setm(e.target.value)} value={m} />

      <label>columns (n)</label>
      <input type="number" onChange={(e) => setn(e.target.value)} value={n} />

      <Table />
    </div>
  );
}

export default App;
