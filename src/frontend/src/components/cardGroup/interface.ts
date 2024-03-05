export interface CardInfo {
    href: string;
    text: string;
    description: string;
    dataTestId: string;
    width: 'full' | 'three-quarters' | 'one-half' | 'two-thirds' | 'one-third' | 'one-quarter';
  }

  export interface CardGroupProps {
    cards: CardInfo[];
  }
