import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './error-boundary.comp';

describe('Error Boundary', () => {
  it('should catch an error thrown by its child component', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const errorBoundaryElement = screen.getByTestId('errorboundary');
    expect(errorBoundaryElement).toBeVisible();
  });
});
