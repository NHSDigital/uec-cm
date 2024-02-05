import React from 'react';
import { Card } from "nhsuk-react-components";
import { CardGroupProps } from "./interface";

const CardGroup: React.FC<CardGroupProps> = ({ cards }) => {
  return (
    <Card.Group>
      {cards.map((card, index) => (
        <Card.GroupItem key={index} width="one-third">
          <Card clickable>
            <Card.Content>
              <Card.Heading className="nhsuk-heading-m">
                <Card.Link href={card.href} data-testid={card.dataTestId}>
                  {card.text}
                </Card.Link>
              </Card.Heading>
              <Card.Description>
                {card.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.GroupItem>
      ))}
    </Card.Group>
  );
};

export default CardGroup;
