import React from 'react';
import { render, screen } from "@testing-library/react";
import CardGroup from "..";

describe('CardGroup', () => {

  it('should render Card.GroupItem component for each card', () => {
    const cards = [
      { href: 'link1', text: 'text1', description: 'description1', dataTestId: "datatestid1" },
      { href: 'link2', text: 'text2', description: 'description2', dataTestId: "datatestid2" },
      { href: 'link3', text: 'text3', description: 'description3', dataTestId: "datatestid3" },
    ];

    render(<CardGroup cards={cards} />);

    cards.forEach((card) => {
      expect(screen.getByText(card.text)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
    });
  });

  it('renders data-testid in the markup', () => {
    const cards = [
      { href: 'link1', text: 'text1', description: 'description1', dataTestId: "datatestid1" },
    ];

    render(<CardGroup cards={cards} />);

    cards.forEach((card) => {
      const elementWithTestId = screen.getByTestId(card.dataTestId);
      expect(elementWithTestId).toBeInTheDocument();
    });
  });
});
