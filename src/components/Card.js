import Button from "./Button";

const TodoCard = (props) => {
  const { todos, setTodos, filterState } = props;

  const handleDeleteState = (task) => {
    const deleteTodo = todos.filter((todo) => todo.id !== task.id);
    setTodos(deleteTodo);
  };

  const handleCheckbox = (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "Active" ? "Completed" : "Active",
        };
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const filterTodo = (todo) => {
    if (filterState === "ALL") {
      return true;
    } else {
      return todo.status === filterState;
    }
  };
  return (
    <div>
      {todos.filter(filterTodo).map((todo, index) => {
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
            <Button onClick={() => handleDeleteState(todo)} text="DELETE" />
          </div>
        );
      })}
    </div>
  );
}
export default TodoCard;
