import { useReducer } from "react";

export enum ActionType {
  Add = "ADD",
  Update = "UPDATE",
  Delete = "DELETE",
  Failure = "FAILURE"
}

export type Action<T> =
  | {
      type: ActionType.Add | ActionType.Update | ActionType.Failure;
      payload: T;
    }
  | {
      type: ActionType.Delete;
      payload: string;
    };

type Reducer<T> = (state: T, action: Action<T>) => T;

const useOptimistic = <T>(
  initialState: T,
  reducer: Reducer<T>
): [T, (action: Action<T>) => void] => {
  const [data, dispatchData] = useReducer(reducer, initialState);

  const dispatchOptimisticAction = (action: Action<T>) => {
    // Handle optimistic updates here
    // Update the state optimistically before making the async call
    dispatchData(action);
  };

  return [data, dispatchOptimisticAction];
};

export default useOptimistic;
