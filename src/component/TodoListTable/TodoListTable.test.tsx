import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import TodoList from "./TodoListTable";

import { toggleEditTodoModal } from "../../reducer/todoReducer";

const mockStore = configureMockStore([thunk]);

describe("TodoList component", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Mock addListener
        removeListener: jest.fn(), // Mock removeListener
        addEventListener: jest.fn(), // Mock addEventListener
        removeEventListener: jest.fn(), // Mock removeEventListener
        dispatchEvent: jest.fn(), // Mock dispatchEvent
      };
    });
  });

  test("renders correctly", () => {
    const store = mockStore({
      todos: [
        {
          id: "1",
          title: "Todo 1",
          desc: "Description 1",
          dueDate: "2022-05-01",
          completeFlag: false,
        },
        {
          id: "2",
          title: "Todo 2",
          desc: "Description 2",
          dueDate: "2022-05-02",
          completeFlag: true,
        },
      ],
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("01 May 2022")).toBeInTheDocument();
    expect(screen.getByText("NOT DONE")).toBeInTheDocument();

    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("02 May 2022")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();

    expect(screen.getByText("CREATE NEW TODO")).toBeInTheDocument();
  });

  test("opens create new todo modal", () => {
    const store = mockStore({
      todos: [],
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const createTodoBtn = screen.getByText(/create new todo/i);
    fireEvent.click(createTodoBtn);

    const modalTitle = screen.getByText(/create new todo/i);
    expect(modalTitle).toBeInTheDocument();
  });

  test("opens edit todo modal", () => {
    const todo = {
      id: "1",
      title: "Todo 1",
      desc: "Description of todo 1",
      dueDate: "2022-04-01T00:00:00.000Z",
      completeFlag: false,
    };

    const store = mockStore({
      todos: [todo],
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(store.getActions()).toContainEqual(toggleEditTodoModal());
  });

  test("deletes todo", () => {
    const store = mockStore({
      todos: [
        {
          id: "1",
          title: "Todo 1",
          desc: "Description 1",
          dueDate: "2022-05-01",
          completeFlag: false,
        },
      ],
    });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const confirmationDeleteButton = screen.getByText("Yes");
    fireEvent.click(confirmationDeleteButton);

    expect(store.getActions()).toEqual([
      { payload: { id: "1" }, type: "DELETE_TODO" },
    ]);
  });
});
