import React from 'react';
import { render } from '@testing-library/react';
import LoaderComp from './loader.comp';

describe('LoaderComp', () => {
  it('renders the loader component', () => {
    const { getByRole } = render(<LoaderComp />);
    const loaderElement = getByRole('progressbar');
    expect(loaderElement).toBeInTheDocument();
  });
});
