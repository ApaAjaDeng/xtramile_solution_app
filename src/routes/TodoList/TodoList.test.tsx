import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import TodoList from "./TodoList";

const mockStore = configureStore([]);

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

  test("renders the title", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const title = screen.getByText(/XTRAMILE SOLUTION - TODO LIST/i);
    expect(title).toBeInTheDocument();
  });
});
