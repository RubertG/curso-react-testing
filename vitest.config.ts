import { defineConfig } from "vitest/config";

// Configuracion para que el proyecto soporte el testing
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true, // Disponibilizar unos matchers globalmente
    setupFiles: ["./src/setupTests.ts"], // Archivo de configuracion de test
  }
});