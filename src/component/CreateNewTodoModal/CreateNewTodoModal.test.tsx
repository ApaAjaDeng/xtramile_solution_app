import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import dayjs from "dayjs";

import CreateNewTodoModal from "./CreateNewTodoModal";
import { TodoState } from "../../reducer/types";

const mockStore = configureStore<Partial<TodoState>>([]);

describe("CreateNewTodoModal", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      openModalCreateNewTodo: true,
    });
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

  it("should dispatch an action to add a new todo when the form is submitted", async () => {
    render(
      <Provider store={store}>
        <CreateNewTodoModal />
      </Provider>
    );

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const dueDateInput = screen.getByLabelText("Due Date");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(titleInput, { target: { value: "New todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of new todo" },
    });
    fireEvent.change(dueDateInput, { target: { value: "02-02-2023" } });
    fireEvent.click(submitButton);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByTestId("form-submit-btn"));
    });

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "ADD_TODO",
        payload: {
          id: expect.any(String),
          title: "New todo",
          desc: "Description of new todo",
          dueDate: dayjs(new Date()).format("MM-DD-YYYY"),
          completeFlag: false,
        },
      },
      { type: "TOGGLE_CREATE_NEW_TODO_MODAL" },
    ]);

    // expect(screen.getByLabelText("Title")).toHaveValue("New todo");
    // expect(screen.getByLabelText("Description")).toHaveValue(
    //   "Description of new todo"
    // );
    // expect(screen.getByLabelText("Due Date")).toHaveValue("02-02-2023");
  });

  it("should dispatch an action to toggle the modal when the cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <CreateNewTodoModal />
      </Provider>
    );

    const cancelButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(cancelButton);
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "TOGGLE_CREATE_NEW_TODO_MODAL" }]);
  });
});
