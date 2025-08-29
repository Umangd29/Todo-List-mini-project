import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoList.css";

export default function TodoList() {
  let [todos, setTodos] = useState([{ id: uuidv4(), task: "sample task", isDone: false }]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodo) => [
      ...prevTodo,
      { task: newTodo, id: uuidv4(), isDone: false }
    ]);
    setNewTodo("");
  };

  let updateTodoTask = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodoTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  let toggleCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.task.toUpperCase() != todo.task) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return {
            ...todo,
            task: todo.task.toLowerCase(),
          }
        }
      })
    );
  };

  let toggleCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          if (todo.task.toUpperCase() != todo.task) {
            return {
              ...todo,
              task: todo.task.toUpperCase(),
            };
          } else {
            return {
              ...todo,
              task: todo.task.toLowerCase(),
            }
          }
        } else {
          return todo;
        }
      })
    );
  };

  let deleteAll = () => {
    setTodos((prevTodos) => []);
  };

  let doneOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isDone: !todo.isDone }
          : todo
      )
    );
  };

  let doneAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        ({ ...todo, isDone: true })
      )
    );
  };

  return (
    <div className="Todos bg-light align-item-center">

      <h2>Todo List</h2>
      <div className="container">
        <div className="input-section row">

          <div className="col col-9 ">
            <input
              value={newTodo}
              onChange={updateTodoTask}
              placeholder="Enter your task..."
              className="col-12 form-control"
            />
          </div>

          <div className="col col-3 ">
            <button className="btn btn-success col-12 add-btn" onClick={addNewTask}>Add</button>
          </div>

        </div>
      </div>

      <hr />
      <h3 className="todo-list-h5">Todo Tasks</h3>

      <ul className="todo-list">

        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">

            <span className="task-text"
              style={{ textDecoration: todo.isDone ? "line-through" : "none" }} >
              {todo.task}
            </span>

            <span className="btn-group" role="group">

              <button
                className="btn btn-outline-primary toggleCaseOne-btn"
                onClick={() => toggleCaseOne(todo.id)}
              >
                {todo.task === todo.task.toUpperCase() ? "🔡" : "🔠"}
              </button>

              <button
                className="btn btn-outline-success mark-as-done-btn"
                onClick={() => doneOne(todo.id)}
              >
                {todo.isDone ? "↩️" : "✅"}
              </button>

              <button
                className="btn btn-outline-danger delete-btn"
                onClick={() => deleteTodoTask(todo.id)}
              >
                ❌
              </button>

            </span>


          </li>
        ))}
      </ul>

      <br></br>
      <div className="container all-btn">
        <div className="row">

          <div className="col-9 col-lg-4 mb-2">
            <button className="btn btn-outline-dark w-100 togglecaseall-btn" onClick={toggleCaseAll}>
              ToggleCase
            </button>
          </div>

          <div className="col-9 col-lg-4 mb-2">
            <button className="btn btn-outline-dark w-100 deleteall-btn" onClick={deleteAll}>
              Delete All
            </button>
          </div>

          <div className="col-9 col-lg-4 mb-2">
            <button className="btn btn-outline-dark w-100 doneall-btn" onClick={doneAll}>
              Done All
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
