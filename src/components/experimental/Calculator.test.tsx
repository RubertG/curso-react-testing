import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';

// Utilizando Test Driven Testing 
describe('<Calculator />', () => {
  const useCasesTest = [
    { a: 1, b: 2, operation: 'add', result: 3 },
    { a: 3, b: 2, operation: 'subtract', result: 1 },
    { a: 3, b: 2, operation: 'multiply', result: 6 },
    { a: 6, b: 2, operation: 'divide', result: 3 },
    { a: 6, b: 0, operation: 'divide', result: 'Error' },
    { a: 6, b: 0, operation: 'invalid', result: 'Invalid operation' }
  ]

  it.each(useCasesTest)(
    'Deberia retornar $result cuando a=$a, b=$b son operation=$operation',
    ({ a, b, operation, result }) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const resultText = screen.getByText(`Result: ${result}`);
      expect(resultText).toBeInTheDocument();
    });
});