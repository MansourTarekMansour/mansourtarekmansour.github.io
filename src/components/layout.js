import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const Spotlight = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 30;
`;

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  max-width: 1280px;
  padding: 48px 24px;

  @media (min-width: 768px) {
    padding: 64px 48px;
  }

  @media (min-width: 1024px) {
    padding: 0 48px;
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }
`;

const MainContent = styled.main`
  padding-top: 48px;

  @media (min-width: 1024px) {
    width: 52%;
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;


const Layout = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Spotlight
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            }}
          />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          <LayoutWrapper>
            <Nav />
            <MainContent id="content">
              {children}
              <Footer />
            </MainContent>
          </LayoutWrapper>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;

