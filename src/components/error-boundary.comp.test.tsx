import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary.comp';

describe('Error Boundary', () => {
  it('should work correctly', () => {
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      //@ts-ignore
      <ErrorBoundary fallback={<ErrorBoundary />}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('errorboundary')).toBeVisible();
  });
});
