import React, { useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";

import { Button, Popconfirm, Table } from "antd";

import dayjs from "dayjs";

import { TodoState } from "../../reducer/types";
import {
  toggleCreateNewTodoModal,
  toggleEditTodoModal,
  deleteTodo,
} from "../../reducer/todoReducer";
import ModalEditTodo from "../EditTodoModal";

const { Column } = Table;

function TodoListTable() {
  const dispatch = useDispatch();
  const todos = useSelector((state: TodoState) => state.todos);
  const { origin } = window.location;

  const [selectedData, setSelectedData] = useState({
    id: "",
    title: "",
    desc: "",
    dueDate: "",
    completeFlag: false,
  });

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Table dataSource={todos} rowKey={(rowData) => rowData.id}>
          <Column title="ID" dataIndex="id" />
          <Column
            title="Title"
            render={(rowData) => <div>{rowData.title}</div>}
          />
          <Column title="Desc" dataIndex="desc" />
          <Column
            title="Due Date"
            render={(tableItem) => (
              <div>{dayjs(tableItem.dueDate).format("DD MMMM YYYY")}</div>
            )}
          />
          <Column
            title="Complete"
            dataIndex="completeFlag"
            render={(completeFlag) => {
              if (completeFlag) {
                return <div className="doneText">DONE</div>;
              }

              return <div className="notDoneText">NOT DONE</div>;
            }}
          />
          <Column
            title="Action"
            render={(rowData) => (
              <div className="actionContainer">
                <Button
                  onClick={() =>
                    window.open(`${origin}/todo-detail/${rowData.id}`, "_blank")
                  }
                >
                  Detail
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedData(rowData);
                    dispatch(toggleEditTodoModal());
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  placement="bottomRight"
                  title="Are you sure to delete this task?"
                  onConfirm={() => {
                    dispatch(
                      deleteTodo({
                        id: rowData?.id.toString(),
                      })
                    );
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            )}
          />
        </Table>
        <Button
          type="primary"
          style={{ width: "-webkit-fill-available" }}
          onClick={() => dispatch(toggleCreateNewTodoModal())}
        >
          CREATE NEW TODO
        </Button>
      </div>
      <ModalEditTodo todoProps={selectedData} />
    </>
  );
}

export default connect()(TodoListTable);
