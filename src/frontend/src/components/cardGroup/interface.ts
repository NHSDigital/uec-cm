export interface CardInfo {
    href: string;
    text: string;
    description: string;
    dataTestId: string;
  }

  export interface CardGroupProps {
    cards: CardInfo[];
  }
