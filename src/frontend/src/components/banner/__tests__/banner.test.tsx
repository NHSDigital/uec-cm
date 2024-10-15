import { render, screen } from '@testing-library/react';
import Banner from '..';

describe('Banner', () => {
  it('should render the heading and text', () => {
    const heading = 'Test Heading';
    const text = 'Test Text';

    render(<Banner heading={heading} text={text} />);

    const headingElement = screen.getByTestId('banner_heading');
    const textElement = screen.getByTestId('banner_text');

    expect(headingElement.textContent).toBe('Test Heading');
    expect(textElement.textContent).toBe('Test Text');
  });
});
