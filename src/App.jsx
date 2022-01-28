import "./App.css";
import { useContext } from "react";
import { MatrixContext } from "./context/MatrixContextProvider";
import { Table } from "./components/Table.tsx";
import { InputsPanel } from "./components/InputsPanel.tsx";

function App() {
  const { matrix } = useContext(MatrixContext);

  return (
    <div className="App">
      <InputsPanel />
      {matrix.length !== 0 && <Table />}
    </div>
  );
}

export default App;
