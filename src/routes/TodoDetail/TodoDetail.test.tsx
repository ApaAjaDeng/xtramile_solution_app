import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import TodoDetail from "./TodoDetail";

const mockStore = configureMockStore([thunk]);

describe("TodoDetail", () => {
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

  test("renders todo details correctly", () => {
    const store = mockStore({
      todos: [
        {
          id: "1",
          title: "Todo 1",
          desc: "Todo 1 description",
          dueDate: "2022-05-01",
          completeFlag: false,
        },
        {
          id: "2",
          title: "Todo 2",
          desc: "Todo 2 description",
          dueDate: "2022-05-02",
          completeFlag: true,
        },
      ],
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/todos/1"]}>
          <Route path="/todos/:id">
            <TodoDetail />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    const titleText = screen.getByText("Title:");
    expect(titleText).toBeInTheDocument();

    const titleDetailText = screen.getByText("Todo 1");
    expect(titleDetailText).toBeInTheDocument();

    const descText = screen.getByText("Description:");
    expect(descText).toBeInTheDocument();

    const descDetailText = screen.getByText("Todo 1 description");
    expect(descDetailText).toBeInTheDocument();

    const dueDateText = screen.getByText("Due Date:");
    expect(dueDateText).toBeInTheDocument();

    const dueDateDetailText = screen.getByText("01 May 2022");
    expect(dueDateDetailText).toBeInTheDocument();

    const completionText = screen.getByText("Todo Complition:");
    expect(completionText).toBeInTheDocument();

    const completionDetailText = screen.getByText("NOT DONE");
    expect(completionDetailText).toBeInTheDocument();
  });
});
