import { act, render, screen, waitFor } from '@testing-library/react';
import AddOrganisationPage from '../add';

beforeEach(async () => {
  await act(async () => {
    render(<AddOrganisationPage />);
  });
});

describe('AddOrganisationPage', () => {
  it('should render the page', async () => {
    await waitFor(() => {
      const testid = screen.getByTestId('add-organisation-page');
      expect(testid).toBeInTheDocument();
    });
  });
});
