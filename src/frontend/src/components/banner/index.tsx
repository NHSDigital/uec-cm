import React from 'react';
import { Hero } from "nhsuk-react-components";
import { BannerProps } from './interface';

const Banner: React.FC<BannerProps> = ({ heading, text }) => {
  return (
    <Hero>
      <Hero.Heading data-testid='banner_heading'>
        {heading}
      </Hero.Heading>
      <Hero.Text data-testid='banner_text'>
        {text}
      </Hero.Text>
    </Hero>
  );
};

export default Banner;
