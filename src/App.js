import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Status from "./components/Status";

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("ALL");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.trim().length === 0) {
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
  };

  const handleDeleteState = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      setTodo(todo.filter((todo) => todo.id !== id));
    }
  };

  

  const handleClearCompleted = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all completed tasks?"
    );
    if (confirmClear) {
      setTodo(todo.filter((todo) => todo.status !== "Completed"));
    }
  };

  const completedTasksCount = todo.filter(
    (todo) => todo.status === "Completed"
  ).length;

  return (
    <div className="body">
      <div className="App">
        <div className="title">Todo List</div>
        <div className="inputContainer">
          <input
            className="input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
          />
          {error.length > 1 && <div>{error}</div>}
          <button className="button" onClick={handleAddButton}>
            Add
          </button>
        </div>
        <Status setFilterState={setFilterState} />

        {todo.length === 0 && <div>No tasks yet. Add one above!</div>}

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
              <div key={todo.id} className="todo">
                <div
                  className="todoText"
                  style={{
                    textDecoration:
                      todo.status === "Completed" ? "line-through" : "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.status === "Completed"}
                    onChange={() => handleCheckbox(todo.id)}
                  />
                  {todo.text}
                </div>
                <button
                  className="delete"
                  onClick={() => handleDeleteState(todo.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}

        {todo.length > 0 && (
          <div className="completedContainer">
            <div className="completedCount">
              {completedTasksCount} of {todo.length} tasks completed
            </div>

            <button className="clearCompleted" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          </div>
        )}

        <div className="footer">Powered by Pinecone academy</div>
      </div>
    </div>
  );
}

export default App;
