import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import NoResultsFound from '../noresultsfound';

const mockAddOrganisation = jest.fn();

beforeEach(() => {
  render(<NoResultsFound onAddOrganisation={mockAddOrganisation} />);
});

describe('NoResultsFound', () => {

  it('should display the correct page heading', () => {
    const heading = screen.getByRole('heading', { level: 1, name: /no results found/i });
    expect(heading).toBeInTheDocument();
  });

  it('should display the question about adding a new organization', () => {
    const question = screen.getByText(/would you like to add a new organisation/i);
    expect(question).toBeInTheDocument();
  });

  it('should update the selected option when an input is changed to yes', async () => {
    const radioYes = screen.getByTestId('yes-radio') as HTMLOptionElement;
    const radioNo = screen.getByTestId('no-radio') as HTMLOptionElement;

    await userEvent.click(radioYes);

    expect(radioYes).toBeChecked();
    expect(radioNo).not.toBeChecked();
  });

  it('should update the selected option when an input is changed to no', async () => {
    const radioYes = screen.getByTestId('yes-radio') as HTMLOptionElement;
    const radioNo = screen.getByTestId('no-radio') as HTMLOptionElement;

    await userEvent.click(radioNo);

    expect(radioYes).not.toBeChecked();
    expect(radioNo).toBeChecked();
  });

  it('should blur on next button click', async () => {
      const blurSpy = jest.spyOn(HTMLElement.prototype, 'blur');
      const nextButton = screen.getByTestId('next-button');

      await userEvent.click(nextButton);

      expect(blurSpy).toHaveBeenCalled();

      blurSpy.mockRestore();
  });

  it('should call onAddOrganisation', async () => {
    const radioYes = screen.getByTestId('yes-radio') as HTMLOptionElement;

    await userEvent.click(radioYes);
    const nextButton = screen.getByTestId('next-button');

    await userEvent.click(nextButton);

    expect(mockAddOrganisation).toHaveBeenCalled();
  });
});
