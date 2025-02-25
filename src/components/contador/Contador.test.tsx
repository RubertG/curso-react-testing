import { describe, it, expect } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { Contador } from "./Contador";

describe("<Contador />", () => {
  it("Deberia renderizar el contador con el valor inicial de 0", () => {
    render(<Contador />);
    const contador = screen.getByText("Contador: 0");
    expect(contador).toBeInTheDocument();
  });

  it("Deberia incrementar el contador en 1", async () => {
    render(<Contador />);
    const boton = screen.getByText("Incrementar");

    await act(async () => {
      fireEvent.click(boton);
    });

    const contador = screen.getByText("Contador: 1");
    expect(contador).toBeInTheDocument();
  });

  it("Deberia decrementar el contador en 1", async () => {
    render(<Contador />);
    const boton = screen.getByText("Decrementar");

    await act(async () => {
      fireEvent.click(boton);
    });

    const contador = screen.getByText("Contador: -1");
    expect(contador).toBeInTheDocument();
  });   
});