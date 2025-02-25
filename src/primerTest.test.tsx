import { describe, it, expect } from "vitest"

describe("Primer test", () => {
  it("Suma de dos numeros", () => {
    const suma = (a: number, b: number) => a + b
    
    expect(suma(1, 2)).toBe(3)
  })

  it("Textos iguales", () => {
    const texto = "Hola mundo"
    const texto2 = "Hola mundo"
    
    expect(texto).toBe(texto2)
  })
})