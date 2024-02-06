import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '..';

describe('Banner', () => {
  it('renders the heading, text1, and text2', () => {
    const heading = 'Test Heading';
    const text1 = 'Test Text 1';
    const text2 = 'Test Text 2';

    render(<Banner heading={heading} text1={text1} text2={text2} />);

    const headingElement = screen.getByText(heading);
    const text1Element = screen.getByText(text1);
    const text2Element = screen.getByText(text2);

    expect(headingElement).toBeInTheDocument();
    expect(text1Element).toBeInTheDocument();
    expect(text2Element).toBeInTheDocument();
  });
});
