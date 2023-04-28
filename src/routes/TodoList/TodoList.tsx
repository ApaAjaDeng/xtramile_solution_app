import React from "react";

import TodoListTable from "../../component/TodoListTable";
import ModalAddNewTodo from "../../component/CreateNewTodoModal";

import "./style.css";

export default function TodoList() {
  return (
    <>
      <div className="title">XTRAMILE SOLUTION - TODO LIST</div>
      <TodoListTable />
      <ModalAddNewTodo />
    </>
  );
}
