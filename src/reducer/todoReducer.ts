import { Todo, TodoState } from "./types";
import { initialState } from "./initialState";

interface AddTodoAction {
  type: "ADD_TODO";
  payload: Todo;
}

interface ToggleTodoAction {
  type: "TOGGLE_TODO";
  payload: {
    id: string;
  };
}

interface UpdateTodoAction {
  type: "UPDATE_TODO";
  payload: Todo;
}

interface DeleteTodoAction {
  type: "DELETE_TODO";
  payload: {
    id: string;
  };
}

interface ToggleCreateNewTodoModal {
  type: "TOGGLE_CREATE_NEW_TODO_MODAL";
}

interface ToggleEditTodoModal {
  type: "TOGGLE_EDIT_TODO_MODAL";
}

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | UpdateTodoAction
  | DeleteTodoAction
  | ToggleCreateNewTodoModal
  | ToggleEditTodoModal;

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: "ADD_TODO",
  payload: todo,
});

export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: "TOGGLE_TODO",
  payload: {
    id,
  },
});

export const updateTodo = (todo: Todo): UpdateTodoAction => ({
  type: "UPDATE_TODO",
  payload: todo,
});

export const deleteTodo = (payload: { id: string }) => ({
  type: "DELETE_TODO",
  payload,
});

export const toggleCreateNewTodoModal = (): ToggleCreateNewTodoModal => ({
  type: "TOGGLE_CREATE_NEW_TODO_MODAL",
});

export const toggleEditTodoModal = (): ToggleEditTodoModal => ({
  type: "TOGGLE_EDIT_TODO_MODAL",
});

const todosReducer = (
  state: TodoState = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            title: action.payload.title,
            desc: action.payload.desc,
            dueDate: action.payload.dueDate,
            completeFlag: action.payload.completeFlag,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completeFlag: !todo.completeFlag }
            : todo
        ),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "TOGGLE_CREATE_NEW_TODO_MODAL":
      return {
        ...state,
        openModalCreateNewTodo: !state.openModalCreateNewTodo,
      };

    case "TOGGLE_EDIT_TODO_MODAL":
      return {
        ...state,
        openModalEditTodo: !state.openModalEditTodo,
      };

    default:
      return state;
  }
};

export default todosReducer;
