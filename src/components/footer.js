import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  max-width: 480px;
  padding-top: 32px;
  padding-bottom: 64px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--dark-slate);

  p {
    margin: 0;

    a {
      font-weight: 500;
      color: var(--slate);
      text-decoration: none;

      &:hover,
      &:focus {
        color: var(--teal);
      }
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Loosely designed in Figma and coded in Visual Studio Code by{' '}
      <a href="https://github.com/MansourTarekMansour" target="_blank" rel="noreferrer">
        Mansour Tarek
      </a>
      . Built with Gatsby and React, styled with Styled-Components.
    </p>
  </StyledFooter>
);

export default Footer;

