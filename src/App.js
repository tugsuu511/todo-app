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
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddButton = () => {
    if (inputValue.length === 0) {
      setError("Please enter a task!");
      return;
    } else {
      setError("");
      setTodo([...todo, { text: inputValue, id: uuidv4(), status: "Active" }]);
      setInputValue("");
    }
  };
  const handleCheckbox = (id) => {
    const newTodo = todo.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "Active" ? "Completed" : "Active",
        };
      }
      return todo;
    });
    setTodo(newTodo);
    console.log(todo);
  };
  const handleFilterState = (state) => {
    setFilterState(state);
  };
  console.log(todo);

  return (
    <div className="body">
      <div className="App">
        <div className="title">Todo List</div>
        <div className="inputContainer">
          {" "}
          <input
            className="input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          {error.length > 1 && <div>{error}</div>}
          <button className="button" onClick={handleAddButton}>
            Add
          </button>
        </div>
        <div className="Status">
          <button onClick={() => handleFilterState("ALL")} className="sort">
            ALL
          </button>
          <button onClick={() => handleFilterState("Active")} className="sort">
            Active
          </button>
          <button
            onClick={() => handleFilterState("Completed")}
            className="sort"
          >
            Completed
          </button>
        </div>

        {todo
          .filter((todo) => {
            if (filterState === "ALL") {
              return true;
            } else {
              return todo.status === filterState;
            }
          })
          .map((todo) => {
            return (
              <div className="todo">
                <div className="todoText">
                  <input
                    type="checkbox"
                    checked={todo.status === "Completed"}
                    onChange={() => handleCheckbox(todo.id)}
                  ></input>
                  {todo.text}
                </div>
                <button className="delete">Delete</button>
              </div>
            );
          })}
        <div className="footer">Powered by Pinecone academy</div>
      </div>
    </div>
  );
}

export default App;
