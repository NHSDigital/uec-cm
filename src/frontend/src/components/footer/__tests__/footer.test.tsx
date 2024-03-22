import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '..';

describe('Footer', () => {
  it('should render footer component with build version and date', () => {
    const buildVersion = "1.0.0";
    const buildDate = "2022-01-01";

    render(<Footer buildVersion={buildVersion} buildDate={buildDate} />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('build-details')).toHaveTextContent(`Version ${buildVersion} - ${buildDate}`);
  });
});
