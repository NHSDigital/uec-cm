import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the header', () => {
  render(<App />);
  const headingElement = screen.getByRole('banner');
  expect(headingElement).toBeInTheDocument();
});
