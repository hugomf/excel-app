import { createSignal } from "solid-js";
import Table from "./components/ResizableTableColRow";

const App = () => {
  const [data, setData] = createSignal([
    ["", "A", "B", "C"],
    ["1", "10", "20", "30"],
    ["2", "40", "50", "60"],
    ["3", "70", "80", "90"],
  ]);

  return (
    <div class="p-4">
      <Table />
    </div>
  );
};

export default App;
