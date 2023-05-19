import { createSignal, Index, onMount } from "solid-js";
import "../resize.css"

type ColumnDefinition = {
    id: string
    name: string
    width: number
}

type Employee = {
    id: string
    name: string
    age: number
}

const ResizableTableCol = () => {

  const [colData, setColData] = createSignal<ColumnDefinition[]>([
    {id: "id",    name: "Id",   width: 100},
    {id: "name",  name: "Name", width: 100},
    {id: "age",   name: "Age",  width: 100}
  ]);
    
  const [data, setData] = createSignal<Employee[]>([
    { id: "1", name: "John",    age: 25},
    { id: "2", name: "Jane",    age: 30},
    { id: "3", name: "Bob",     age: 40}
  ]);

  const [resizingColumn, setResizingColumn] = createSignal(null);

  const handleMouseDown = (e: any, colName:string) => {
    e.preventDefault();
    

    let colResizable = {td: e.target.parentNode, colName: colName};

    console.log("start dragging");
    setResizingColumn(colResizable);
    document.getElementsByTagName("body")[0].style.cursor = "col-resize"
  };

  const handleMouseMove = (e: any) => {
    e.preventDefault();

    
    if (resizingColumn() != null) {

        let td      = resizingColumn().td as HTMLElement;
        let width   =  e.pageX - td.offsetLeft;
        let colName = resizingColumn().colName;

        setColData(colData().map(item =>
            item.name === colName ? { ...item, width } : item
        ));
    }
  } 

  const handleMouseUp = () => {
    console.log("Stop Dragging!")
    setResizingColumn(null);
    document.getElementsByTagName("body")[0].style.cursor = "auto"
  };


  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);


  return (
    <div style="flex justify-center items-center">
      <table 
        class="border-collapse">
        <thead class="bg-gray-200">
          <tr style="border">
            <Index each={colData()}>{(item) => (
                <th class="border p-2" 
                    style={{ width: `${item().width}px`, position: 'relative' }}>{item().name}
                  <div class="col-resizer" style={{ cursor: "col-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, item().name)} />
                </th>
            )}</Index>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>{(rowItem, index: number) => (
            <tr class={`bg-${index%2 ? 'gray-100' : 'white'} hover:bg-gray-300`}>
            <Index each={colData()}>{(colItem) => (
              <td class="border p-2">{rowItem()[colItem().id as keyof Employee]}
                <div class="col-resizer" style={{ cursor: "col-resize" }}
                    onMouseDown={(e) => handleMouseDown(e, colItem().name)} />
              </td>
              )}</Index>
            </tr>
          )}</Index>
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTableCol;
