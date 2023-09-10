import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../resources/i18n';
import HeaderComp from './header.comp';

// Mock react-redux useDispatch and useSelector
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));

// Mock signOut function
jest.mock('../app/auth/api/sign-out', () => ({
  signOut: jest.fn(),
}));

// Mock storage module
jest.mock('../local-storage/storage', () => ({
  get: jest.fn(),
  clear: jest.fn(),
}));

describe('HeaderComp', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <HeaderComp />
        </BrowserRouter>
      </I18nextProvider>,
    );
    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
