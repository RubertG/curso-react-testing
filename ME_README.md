# Mi README para el futuro

## Dependencias

```bash
  pnpm i @testing-library/dom @testing-library/jest-dom @testing-library/react jsdom vitest -D
```

- @testing-library/dom: virtualiza el dom en un ambiente de testing.
- @testing-library/jest-dom: proporciona matchers para las pruebas que se van a configurar.
- @testing-library/react: provee utilidades de React para hacer testing en los componentes de React.
- jsdom: traer mas utilidades para configurar los test que vamos a hacer.
- vitest: es un runner de test que nos permite correr los test en un ambiente de Vite.

## Configurar archivos

1. Crear un archivo `vitest.config.ts` en la raíz del proyecto.

```typescript
import { defineConfig } from "vitest/config";

// Configuracion para que el proyecto soporte el testing
export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true, // Disponibilizar unos matchers globalmente
		setupFiles: ["./src/setupTests.ts"], // Archivo de configuracion de test
	},
});
```

2. Crear un archivo `setupTests.ts` en la carpeta `src`.

```typescript
import "@testing-library/jest-dom";
```

3. Modificar el archivo `package.json` para agregar los scripts de test.

```json
{
  "scripts": {
    "test": "vitest",
  }
}
```

## Ejecutar los test

```bash
  pnpm test
```

## Cuando utilizar Spy 

Cuando necesite verificar el flujo completo de una función, es decir, que se ejecute una función interna de otra función, se puede utilizar `vi.spyOn` para verificar que se ejecute la función interna correctamente.