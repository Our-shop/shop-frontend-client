import React from 'react';
import { render } from '@testing-library/react';
import FooterComp from './footer.comp';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('FooterComp', () => {
  it('should render the copyright text', () => {
    const { getByText } = render(<FooterComp />);
    const copyrightText = getByText(/Copyright/);
    expect(copyrightText).toBeInTheDocument();
  });

  it('should render GitHub links', () => {
    const { getByText } = render(<FooterComp />);
    const dmitryGitHubLink = getByText(/Dmitry/);
    const anastasyaGitHubLink = getByText(/Anastasya/);

    expect(dmitryGitHubLink).toBeInTheDocument();
    expect(anastasyaGitHubLink).toBeInTheDocument();
  });
});
