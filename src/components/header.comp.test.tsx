import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <HeaderComp />
      </BrowserRouter>,
    );
    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
