export interface Todo {
  id: string;
  title: string;
  desc: string;
  dueDate: string;
  completeFlag: boolean;
}

export interface TodoState {
  openModalCreateNewTodo: boolean;
  openModalEditTodo: boolean;
  todos: Todo[];
}
