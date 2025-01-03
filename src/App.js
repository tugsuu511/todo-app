import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const todo = {
  text: "Do homework",
  id: 1,
  status: "Active" | "Completed",
};

function App() {
  const [todo, setTodo] = useState([]);
  const [deletedTodo, setDeletedTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddButton = () => {
    if (inputValue.length === 0) {
      setError("Please enter a todo");
      return;
    } else {
      setError("");
      setTodo([...todo, { text: inputValue, id: uuidv4(), status: "Active" }]);
      setInputValue("");
    }
  };
  const handleCheckbox = (id) => {
    console.log(id);
    todo.map((todo) => {
      if (id === todo.id) {
        todo.status = "Completed";
      }
      return todo;
    });
  };
  console.log(todo);

  return (
    <div className="App">
      <div>Todo List</div>
      <input
        placeholder="Add to do"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      {error.length > 1 && <div>{error}</div>}
      <button onClick={handleAddButton}>Add</button>
      {todo.map((todo) => {
        return (
          <div>
            <input type="checkbox" onChange={handleCheckbox(todo.id)}></input>
            {todo.text}
          </div>
        );
      })}
      <div className="Status">
        <div>ALL</div>
        <div>Active</div>
        <div>Completed</div> 
      </div>
    </div>
  );
}

export default App;
