import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);

  const toggleFinished = () => {
    setShowFinished(!ShowFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-2 my-5 min-h-[80vh] bg-violet-100 rounded-xl p-5">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-1/2" />
          <button onClick={handleAdd} className="p-1 mx-6 font-bold text-white rounded-md bg-violet-800 hover:bg-violet-950">
            Add
          </button>
          {/* <input type="checkbox" checked={ShowFinished} onChange={toggleFinished} className="m-2" /> */}
        </div>
        <h2 className="text-xl font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5 text-lg font-bold">No todos to display</div>}
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo my-3 w-1/2 flex justify-between">
                <div className="flex gap-5">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="m-2" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={() => { handleEdit(item.id) }} className="p-1 mx-2 font-bold text-white rounded-md py-1 bg-violet-800 hover:bg-violet-950">Edit</button>
                  <button onClick={() => { handleDelete(item.id) }} className="p-1 mx-2 font-bold text-white rounded-md py-1 bg-violet-800 hover:bg-violet-950">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
