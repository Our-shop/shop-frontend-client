import React from 'react';
import { render } from '@testing-library/react';
import LanguageSwitcher from './language-switcher.comp';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
    };
  },
}));

describe('LanguageSwitcher', () => {
  it('renders the LanguageSwitcher component', () => {
    const { getByText } = render(<LanguageSwitcher />);
    expect(getByText('En')).toBeInTheDocument();
    expect(getByText('Ru')).toBeInTheDocument();
  });
});
