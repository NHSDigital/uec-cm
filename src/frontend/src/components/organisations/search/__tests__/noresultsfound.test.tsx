import React from 'react';
import { act, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import NoResultsFound from '../noresultsfound';

describe('NoResultsFound', () => {

  it('should display the correct page heading', () => {
    render(<NoResultsFound />);
    const heading = screen.getByRole('heading', { level: 1, name: /no results found/i });
    expect(heading).toBeInTheDocument();
  });

  it('should display the question about adding a new organization', () => {
    render(<NoResultsFound />);
    const question = screen.getByText(/would you like to add a new organisation/i);
    expect(question).toBeInTheDocument();
  });

  it('should update the selected option when an input is changed to yes', () => {
    render(<NoResultsFound />);
    const radioYes = screen.getByTestId('yes-radio') as HTMLOptionElement;
    const radioNo = screen.getByTestId('no-radio') as HTMLOptionElement;

    act(() => {
      userEvent.click(radioYes);
    });

    expect(radioYes).toBeChecked();
    expect(radioNo).not.toBeChecked();
  });

  it('should update the selected option when an input is changed to no', () => {
    render(<NoResultsFound />);
    const radioYes = screen.getByTestId('yes-radio') as HTMLOptionElement;
    const radioNo = screen.getByTestId('no-radio') as HTMLOptionElement;

    act(() => {
      userEvent.click(radioNo);
    });

    expect(radioYes).not.toBeChecked();
    expect(radioNo).toBeChecked();
  });
});
