import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { Button } from "./Button"


describe("<Button />", () => {
  it("Renderiza el boton", () => {
    render(<Button label="Soy un botón" />)
    const button = screen.getByText("Soy un botón")
    expect(button).toBeInTheDocument()
  })

  it("Deberia llamar a la funcion onClick", async () => {
    // Arrange (Preparar)
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)
    const button = screen.getByText("Click")
 
    // Act (Actuar)
    await act(() => {
      fireEvent.click(button)
    })

    // Assert (Verificar)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})