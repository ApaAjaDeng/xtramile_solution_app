import { TodoState } from "./types";

export const initialState: TodoState = {
  openModalCreateNewTodo: false,
  openModalEditTodo: false,
  todos: [
    {
      id: "1234",
      title: "Complete Task 1",
      desc: "Finish the first task by the end of the day",
      dueDate: "2023-05-01T00:00:00.000Z",
      completeFlag: false,
    },
    {
      id: "5678",
      title: "Complete Task 2",
      desc: "Finish the second task by the end of the day",
      dueDate: "2023-05-02T00:00:00.000Z",
      completeFlag: true,
    },
    // {
    //   id: "91011",
    //   title: "Complete Task 3",
    //   desc: "Finish the third task by the end of the day",
    //   dueDate: "2023-05-03T00:00:00.000Z",
    //   completeFlag: false,
    // },
    // {
    //   id: "121314",
    //   title: "Complete Task 4",
    //   desc: "Finish the fourth task by the end of the day",
    //   dueDate: "2023-05-04T00:00:00.000Z",
    //   completeFlag: true,
    // },
  ],
};
