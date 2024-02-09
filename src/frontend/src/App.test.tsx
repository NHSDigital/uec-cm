import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

it('renders the header', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const headingElement = screen.getByRole('banner');
  expect(headingElement).toBeInTheDocument();
});
