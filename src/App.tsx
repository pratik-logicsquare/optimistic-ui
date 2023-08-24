import React, { useRef, useState } from "react";
import { addTodo } from "./utils/api-calls";
import { todos as todoData } from "./utils/todos";
import useOptimistic, { ActionType } from "./hooks/use-optimistic";
import "./styles.css";
import { Todo } from "./types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(todoData);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, action) => {
      switch (action.type) {
        case ActionType.Failure:
          return todos;
        case ActionType.Add:
          return [...state, ...action.payload];
        default:
          return state;
      }
    }
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const _handleAddTodo = async () => {
    const newTodo = {
      id: String(Date.now()),
      title: inputRef?.current?.value as string
    };
    addOptimisticTodo({ type: ActionType.Add, payload: [newTodo] });
    try {
      const data = await addTodo(newTodo);
      setTodos(data);
    } catch (error) {
      addOptimisticTodo({ type: ActionType.Failure, payload: todos });
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input type="text" ref={inputRef} />
      <button onClick={_handleAddTodo}>Add</button>

      <h4>Optimistic Todos</h4>
      <ul>
        {optimisticTodos.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <h4>Non-Optimistic Todos</h4>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
