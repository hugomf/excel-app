import { createSignal, Index } from 'solid-js';


type Employee = {
  id: number;
  name?: string;
  age?: number;
};

const Table = () => {

  const data: Employee[] = [
    { id: 1, name: 'John Doe', age: 32 },
    { id: 2, name: 'Jane Smith', age: 27 },
    { id: 3, name: 'Bob Johnson', age: 45 },
  ];

  return (
    <table class="border-collapse w-full">
      <thead class="bg-gray-200">
        <tr class="border">
          <th class="border p-2">ID</th>
          <th class="border p-2">Name</th>
          <th class="border p-2">Age</th>
        </tr>
      </thead>
      <tbody>
        <Index each={data}>{(item, index) => 
          <tr class={`border ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td class="border p-2">{item().id}</td>
            <td class="border p-2">{item().name}</td>
            <td class="border p-2">{item().age}</td>
          </tr>
        }</Index>
      </tbody>
    </table>
  );
}

export default Table;
