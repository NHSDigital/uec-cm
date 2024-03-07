import React from 'react';
import { Card, Col, Row } from "nhsuk-react-components";
import { CardGroupProps } from "./interface";
import RightChevronIcon from '../images/rightchevron';

const CardGroup: React.FC<CardGroupProps> = ({ cards }) => {
  return (
    <Card.Group data-testid='card-group'>
      {cards.map((card, index) => (
        <Card.GroupItem key={index} width={card.width}>
          <Card clickable>
            <Card.Content>
              <Row>
                <Col width="three-quarters">
                  <Card.Heading className="nhsuk-heading-m">
                  <Card.Link href={card.href} data-testid={card.dataTestId}>
                    {card.text}
                  </Card.Link>
                </Card.Heading>
                </Col>
              </Row>
              <Row>
                <Col width="three-quarters">
                <Card.Description>
                  {card.description}
                </Card.Description>
                </Col>
                <Col width="one-quarter">
                  <RightChevronIcon />
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Card.GroupItem>
      ))}
    </Card.Group>
  );
};

export default CardGroup;
