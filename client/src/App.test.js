/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Guess The Celebrity Game/i);
  expect(linkElement).toBeInTheDocument();
});
