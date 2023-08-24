import { Todo } from "../types";
import { todos } from "./todos";

export const addTodo = (todo: Todo): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve([...todos, todo]);
      reject("Can't add!!!");
    }, 2000);
  });
};
