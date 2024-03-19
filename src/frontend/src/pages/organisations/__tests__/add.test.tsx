import React from 'react';
import { render, screen } from '@testing-library/react';
import AddOrganisationPage from '../add';

beforeEach(() => {
  render(<AddOrganisationPage />);
});

describe('AddOrganisationPage', () => {
    it('should render the page component', () => {
    const testid = screen.getByTestId('add-organisation-page');
    expect(testid).toBeInTheDocument();
  });
});
