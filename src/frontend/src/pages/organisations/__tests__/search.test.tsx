import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSX } from 'react/jsx-runtime';
import SearchOrganisationPage from '../search';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: Router });
};

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  const useNavigateMock = jest.fn();

  return {
    ...originalModule,
    useNavigate: () => useNavigateMock,
  };
});

beforeEach(() => {
  renderWithRouter(<SearchOrganisationPage />);
});

describe('SearchOrganisationPage', () => {
    it('should render the search organisation page', () => {
    const testid = screen.getByTestId('organisation-search-page');
    expect(testid).toBeInTheDocument();
  });

  it('should render the OrganisationsSearch component', () => {
    const testid = screen.getByTestId('organisation-search');
    expect(testid).toBeInTheDocument();
  });

  it('should render the NoResults component', async() => {
    act(() => {
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, '000');
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const searchResults = screen.getByTestId('no-results-found');
      expect(searchResults).toBeInTheDocument();
    });
  });

  it('should render the Results component', async() => {
    act(() => {
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, 'adrian');
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();
    });
  });

  it('should navigate to the organisation add page', async() => {
    const navigateMock = useNavigate();

    act(() => {
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, '000');
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const nextButton = screen.getByTestId('next-button');
      userEvent.click(nextButton);
    });

    expect(navigateMock).toHaveBeenCalledWith('/organisations/add');
  });

  it('should navigate to view organisation page when row is selected and organisation exists in organisationSearchResult', async () => {
    const navigateMock = useNavigate();

    act(() => {
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, 'royal');
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const rowLink = screen.getByTestId('search-row-1-link');
      userEvent.click(rowLink);
    });

    expect(navigateMock).toHaveBeenCalledWith(
      expect.stringContaining('/organisations/view/3182237100353408'),
      expect.objectContaining({
        state: {
          organisation: expect.objectContaining({
            Address: expect.arrayContaining([
              expect.objectContaining({
                city: "London",
                country: "England",
                line: expect.arrayContaining(["Part 2S", "Nottingham", "NHS Technology Park"]),
                postalCode: "XX11 1XX"
              })
            ]),
            active: "true",
            createdBy: "Admin",
            createdDateTime: "06-02-2024 11:23:32",
            id: "3182237100353408",
            identifier: expect.objectContaining({
              type: "ODS",
              use: "secondary",
              value: "QT6"
            }),
            modifiedBy: "Admin",
            modifiedDateTime: "06-02-2024 11:23:32",
            name: "Mock Chesterfield Royal Hospital NHS Foundation Trust",
            resourceType: "Organization",
            type: "Strategic Partnership"
          })
        }
      })
    );
  });
});
