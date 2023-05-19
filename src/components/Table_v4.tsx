

// Adding Cancel Event during changing size

import { createSignal, Index, onMount } from "solid-js";
import "../resize.css"


type ColumnDefinition = {
    id: string
    name: string
    width: number
}

type Employee = {
    id: number
    name: string
    age: number
    height: number
}

const Table_v4 = () => {

  const [colData, setColData] = createSignal<ColumnDefinition[]>([
    {id: "id",    name: "Id",   width: 100},
    {id: "name",  name: "Name", width: 100},
    {id: "age",   name: "Age",  width: 100}
  ]);
    
  const [data, setData] = createSignal<Employee[]>([
    { id: 1, name: "John",    age: 25, height: 20},
    { id: 2, name: "Jane",    age: 30, height: 50},
    { id: 3, name: "Bob",     age: 40, height: 20}
  ]);

  const [resizingColumn, setResizingColumn] = createSignal(null);
  const [resizingRow, setResizingRow] = createSignal(null);
  const [prevColWidth, setPrevColWidth] = createSignal({colName:"", width: 0});
  const [prevRowHeight, setPrevRowHeight] = createSignal({index:0,  height: 0});
  
  const handleRowMouseDown = (e: any, rowItem: any) => {
    e.preventDefault();
    
    let rowResizable = {td: e.target.parentNode, rowIndex: rowItem.index};
    console.log("start row dragging");
    setPrevRowHeight({index: rowItem.index, height: rowItem.height})
    setResizingRow(rowResizable);
    document.getElementsByTagName("body")[0].style.cursor = "row-resize";

  };

  const handleRowMouseMove = (e: any) => {
    e.preventDefault();

    
    if (resizingRow() != null) {

        let td      = resizingRow().td as HTMLElement;
        let height   =  e.pageY - td.offsetTop;
        let rowIndex = resizingRow().rowIndex;
        setData(data().map((item) =>
            item.id === rowIndex ? { ...item, height } : item
        ));

        

    }
  } 

  const handleRowMouseUp = () => {
    console.log("Stop Row Dragging!")
    setResizingRow(null);
    document.getElementsByTagName("body")[0].style.cursor = "auto"
  };

  // ----------------------------------------------------------------
  // Drag a Column
  // ----------------------------------------------------------------

  const handleColMouseDown = (e: any, colItem: any) => {
    e.preventDefault();
    
    let colResizable = {td: e.target.parentNode, colName: colItem.name};
    console.log("start row dragging");
    setPrevColWidth({colName: colItem.name, width: colItem.width}); 
    setResizingColumn(colResizable);
    document.getElementsByTagName("body")[0].style.cursor = "col-resize"
  };

  
  const handleColMouseMove = (e: any) => {
    e.preventDefault();

    
    if (resizingColumn() != null) {

        let td      = resizingColumn().td as HTMLElement;
        let width   =  e.pageX - td.offsetLeft;
        let colName = resizingColumn().colName;

        setColData(colData().map(item =>
            item.name === colName ?  { ...item, width } : item
        ));

    }
  } 

  const handleColMouseUp = () => {
    console.log("Stop Col Dragging!")
    setResizingColumn(null);
    document.getElementsByTagName("body")[0].style.cursor = "auto"
  };

  function handleEscKeyWhenResizingCol(this: Document, ev: KeyboardEvent) {

    if (ev.key === 'Escape') {
    
      if (resizingColumn() != null) {
        handleColMouseUp();
        setColData(colData().map(item =>
          item.name === prevColWidth().colName ?  { ...item, width: prevColWidth().width } : item
        ));
        setPrevColWidth(null);
      }
    }
  }
  
  function handleEscKeyWhenResizingRow(this: Document, ev: KeyboardEvent) {

    if (ev.key === 'Escape') {
      if (resizingRow() != null) {
        handleRowMouseUp();
        setData(data().map(item =>
          item.id === prevRowHeight().id ?  { ...item, width: prevRowHeight().height } : item
        ));
        setPrevRowHeight(null);
      }
    }
  }


  // Event Listeners

  document.addEventListener("keydown", handleEscKeyWhenResizingCol);
  document.addEventListener("keydown", handleEscKeyWhenResizingRow);

  document.addEventListener("mousemove", handleRowMouseMove);
  document.addEventListener("mouseup", handleRowMouseUp);
  document.addEventListener("mousemove", handleColMouseMove);
  document.addEventListener("mouseup", handleColMouseUp);

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
                    onMouseDown={(e) => handleColMouseDown(e, item())} />
                </th>
            )}</Index>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>{(rowItem, index: number) => (
            <tr style={{ height: `${rowItem().height}px`}} 
              class={`bg-${index%2 ? 'gray-100' : 'white'} hover:bg-gray-300`}>
            <Index each={colData()}>{(colItem) => (
              <td class="border p-2">{rowItem()[colItem().id as keyof Employee]}
                <div class="col-resizer" style={{ cursor: "col-resize" }}
                    onMouseDown={(e) => handleColMouseDown(e, colItem())} />
                <div class="row-resizer" style={{ cursor: "row-resize" }}
                  onMouseDown={(e) => handleRowMouseDown(e, rowItem())} />
              </td>
              )}</Index>
            </tr>
          )}</Index>
        </tbody>
      </table>
    </div>
  );

};
  

export default Table_v4;

