import { describe, it, expect } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("<TodoList />", () => {
  const todos = [
    { id: 1, text: "Todo 1" },
    { id: 2, text: "Todo 2" },
    { id: 3, text: "Todo 3" },
  ];

  const renderTodoList = (initialTodos = todos) => render(<TodoList todos={initialTodos} />);

  it("Renderizar lista de elementos", () => {
    const { container } = renderTodoList();
    const todoItems = container.querySelectorAll("li");

    expect(todoItems.length).toBe(3);
    expect(todoItems[0].textContent).toBe("Todo 1");
    expect(todoItems[1].textContent).toBe("Todo 2");
    expect(todoItems[2].textContent).toBe("Todo 3");
  });

  it("Agregar un todo", async () => {
    const { container } = renderTodoList();
    const input = screen.getByPlaceholderText("Añadir todo");
    const button = screen.getByText("Agregar");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Nuevo todo" } });
      fireEvent.click(button);
    });

    const todoItems = container.querySelectorAll("li");

    expect(todoItems.length).toBe(4);
    expect(todoItems[3].textContent).toBe("Nuevo todo");
  });

  it("Eliminar un todo", async () => {
    const { container } = renderTodoList();
    const item = screen.getByText("Todo 1");

    await act(async () => {
      fireEvent.click(item);
    });

    const updatedTodoItems = container.querySelectorAll("li");

    expect(updatedTodoItems.length).toBe(2);
    updatedTodoItems.forEach(item => {
      expect(item.textContent).not.toBe("Todo 1");
    });
    expect(updatedTodoItems[0].textContent).toBe("Todo 2");
    expect(updatedTodoItems[1].textContent).toBe("Todo 3");
  });
});