import React from 'react';
import { Hero } from "nhsuk-react-components";
import { BannerProps } from './interface';

const Banner: React.FC<BannerProps> = ({ heading, text1, text2 }) => {
  return (
    <Hero>
      <Hero.Text>
        {text1}
      </Hero.Text>
      <Hero.Heading>
        {heading}
      </Hero.Heading>
      <Hero.Text>
        {text2}
      </Hero.Text>
    </Hero>
  );
};

export default Banner;
