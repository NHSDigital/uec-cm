import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
it('renders hello and welcome', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Hello and welcome to UEC Capacity Management/i });
  expect(headingElement).toBeInTheDocument();
});
