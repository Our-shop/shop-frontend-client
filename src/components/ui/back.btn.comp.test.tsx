import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackHomeBtn from './back.btn.comp';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('BackHomeBtn', () => {
  it('renders the "Go Back" button with the correct link', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BackHomeBtn />
      </MemoryRouter>,
    );
    const goBackButton = getByTestId('back-btn');
    expect(goBackButton).toBeInTheDocument();

    const linkElement = goBackButton.closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
