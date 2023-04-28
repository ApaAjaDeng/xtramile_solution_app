import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import EditTodoModal from "./EditTodoModal";

describe("EditTodoModal", () => {
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

  const mockStore = configureStore([]);
  const todo = {
    id: "123",
    title: "Test Todo",
    desc: "Test Description",
    dueDate: "2022-05-01",
    completeFlag: false,
  };

  it("renders the modal with correct title", () => {
    const store = mockStore({ openModalEditTodo: true });
    render(
      <Provider store={store}>
        <EditTodoModal todoProps={todo} />
      </Provider>
    );
    const modalTitle = screen.getByText("Edit Todo");
    expect(modalTitle).toBeInTheDocument();
  });

  it("should render with the correct initial values", () => {
    const store = mockStore({ openModalEditTodo: true });
    render(
      <Provider store={store}>
        <EditTodoModal todoProps={todo} />
      </Provider>
    );

    expect(screen.getByLabelText("Title")).toHaveValue(todo.title);
    expect(screen.getByLabelText("Description")).toHaveValue(todo.desc);
    expect(screen.getByDisplayValue("05-01-2022")).toBeInTheDocument();
    expect(screen.getByLabelText("Completion")).not.toBeChecked();
  });

  it("should dispatch updateTodo action when submitting the form", async () => {
    const store = mockStore({ openModalEditTodo: true });
    const todo = {
      id: "123",
      title: "Test Title",
      desc: "Test Description",
      dueDate: "02-02-2023",
      completeFlag: false,
    };

    render(
      <Provider store={store}>
        <EditTodoModal todoProps={todo} />
      </Provider>
    );

    const newTitle = "New Test Title";
    const newDesc = "New Test Description";
    const newDueDate = "02-02-2023";

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: newTitle },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: newDesc },
    });
    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: newDueDate },
    });
    fireEvent.click(screen.getByLabelText("Completion"));
    fireEvent.click(screen.getByText(/submit/i));

    const actions = store.getActions();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByTestId("form-submit-btn"));
    });

    expect(actions).toEqual([
      {
        type: "UPDATE_TODO",
        payload: {
          id: todo.id,
          title: newTitle,
          desc: newDesc,
          dueDate: newDueDate,
          completeFlag: true,
        },
      },
      { type: "TOGGLE_EDIT_TODO_MODAL" },
    ]);
  });
});
