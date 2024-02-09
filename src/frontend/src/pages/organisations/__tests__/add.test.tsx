import React from 'react';
import { render, screen } from '@testing-library/react';
import AddOrganisationPage from '../add';

describe('Add page', () => {
  it('renders the place holder text', () => {
    render(<AddOrganisationPage  />);

    const label = screen.getByText('Placeholder for adding an organisation');
    expect(label).toBeInTheDocument();
  });
});
