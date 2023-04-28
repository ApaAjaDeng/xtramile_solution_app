import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Form, Input, Modal, DatePicker, Button, Checkbox } from "antd";

import dayjs from "dayjs";

import { updateTodo, toggleEditTodoModal } from "../../reducer/todoReducer";
import { Todo, TodoState } from "../../reducer/types";

const { Item } = Form;
const { TextArea } = Input;

type ModalEditTodoProps = {
  todoProps: Todo;
};

function EditTodoModal({ todoProps }: ModalEditTodoProps) {
  const dispatch = useDispatch();
  const openModal = useSelector((state: TodoState) => state.openModalEditTodo);

  const handleSubmit = (formValue: {
    Title: string;
    Description: string;
    DueDate: Date;
    Completion: boolean;
  }) => {
    dispatch(
      updateTodo({
        id: todoProps.id,
        title: formValue.Title,
        desc: formValue.Description,
        dueDate: dayjs(formValue.DueDate).format("MM-DD-YYYY"),
        completeFlag: formValue.Completion,
      })
    );

    dispatch(toggleEditTodoModal());
  };

  return (
    <>
      <Modal
        title="Edit Todo"
        open={openModal}
        destroyOnClose
        onCancel={() => dispatch(toggleEditTodoModal())}
        footer={false}
        width={600}
      >
        <Form
          name="create_new_todo"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={(formValue) => handleSubmit(formValue)}
          onFinishFailed={(errorInfo) => console.log(errorInfo)}
          autoComplete="off"
          initialValues={{
            Title: todoProps.title,
            Description: todoProps.desc,
            DueDate: dayjs(todoProps.dueDate),
            Completion: todoProps.completeFlag,
          }}
        >
          <Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Please enter a Title" }]}
          >
            <Input />
          </Item>
          <Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: "Please enter a Description" }]}
          >
            <TextArea rows={6} showCount />
          </Item>
          <Item
            label="Due Date"
            name="DueDate"
            rules={[{ required: true, message: "Please select a Due Date" }]}
          >
            <DatePicker format="MM-DD-YYYY" style={{ width: "100%" }} />
          </Item>
          <Item label="Completion" name="Completion" valuePropName="checked">
            <Checkbox />
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
    </>
  );
}

export default connect()(EditTodoModal);
