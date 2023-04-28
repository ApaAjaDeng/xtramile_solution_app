import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { v4 as uuid } from "uuid";

import { Form, Modal, Input, DatePicker, Button } from "antd";

import dayjs from "dayjs";

import { addTodo, toggleCreateNewTodoModal } from "../../reducer/todoReducer";
import { TodoState } from "../../reducer/types";

const { Item } = Form;
const { TextArea } = Input;

function CreateNewTodoModal() {
  const dispatch = useDispatch();
  const openModal = useSelector(
    (state: TodoState) => state.openModalCreateNewTodo
  );

  const handleSubmit = (formValue: {
    Title: string;
    Description: string;
    DueDate: Date;
  }) => {
    const unique_id = uuid();
    dispatch(
      addTodo({
        id: unique_id.slice(0, 8),
        title: formValue.Title,
        desc: formValue.Description,
        dueDate: dayjs(formValue.DueDate).format("MM-DD-YYYY"),
        completeFlag: false,
      })
    );

    dispatch(toggleCreateNewTodoModal());
  };

  return (
    <Modal
      title="Create New Todo"
      open={openModal}
      destroyOnClose
      onCancel={() => dispatch(toggleCreateNewTodoModal())}
      footer={false}
      width={600}
    >
      <Form
        name="create_new_todo"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={(formValue) => handleSubmit(formValue)}
        autoComplete="off"
      >
        <Item label="Title" name="Title">
          <Input />
        </Item>
        <Item label="Description" name="Description">
          <TextArea rows={6} showCount />
        </Item>
        <Item label="Due Date" name="DueDate">
          <DatePicker format="DD MMM YYYY" style={{ width: "100%" }} />
        </Item>
        <Item style={{ marginBottom: "0", paddingLeft: "86%" }}>
          <Button
            type="primary"
            htmlType="submit"
            data-testid="form-submit-btn"
          >
            Submit
          </Button>
        </Item>
      </Form>
    </Modal>
  );
}

export default connect()(CreateNewTodoModal);
