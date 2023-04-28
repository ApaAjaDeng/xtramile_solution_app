import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";

import { TodoState, Todo } from "../../reducer/types";

import "./style.css";

export default function TodoDetail() {
  const urlParams: { id: string } = useParams();
  const todos = useSelector((state: TodoState) => state.todos);
  const filteredTodo = todos.find((todo: Todo) => todo.id === urlParams.id);

  return (
    <div className="mainContainer">
      <div className="detailListContainer">
        <div className="listTypeText">Title:</div>
        <div className="listDetailText">{filteredTodo?.title || ""}</div>
      </div>
      <div className="detailListContainer">
        <div className="listTypeText">Description:</div>
        <div
          className="listDetailText"
          dangerouslySetInnerHTML={{ __html: filteredTodo?.desc || "" }}
        />
      </div>
      <div className="detailListContainer">
        <div className="listTypeText">Due Date:</div>
        <div className="listDetailText">
          {dayjs(filteredTodo?.dueDate || "").format("DD MMMM YYYY") || ""}
        </div>
      </div>
      <div className="detailListContainer">
        <div className="listTypeText">Todo Complition:</div>
        <div className="listDetailText">
          {filteredTodo?.completeFlag ? "DONE" : "NOT DONE"}
        </div>
      </div>
    </div>
  );
}
