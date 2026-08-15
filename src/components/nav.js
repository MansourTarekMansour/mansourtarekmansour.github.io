import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Icon } from '@components/icons';

const StyledHeader = styled.header`
  padding-top: 48px;
  padding-bottom: 24px;

  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    display: flex;
    max-height: 100vh;
    width: 48%;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 96px;
    padding-bottom: 96px;
  }

  .header-top {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--lightest-slate);
    margin: 0;

    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: inherit;
      }
    }
  }


  .title {
    margin-top: 8px;
    font-size: clamp(18px, 3vw, 20px);
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--lightest-slate);
  }

  .tech-subtitle {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--teal);
  }

  .tagline {
    margin-top: 14px;
    max-width: 320px;
    font-size: 15px;
    line-height: 1.5;
    color: var(--slate);
  }

  .resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 18px;
    width: max-content;
    padding: 8px 16px;
    border: 1px solid var(--teal);
    border-radius: 4px;
    background-color: rgba(45, 212, 191, 0.08);
    color: var(--teal);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      background-color: rgba(45, 212, 191, 0.18);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(45, 212, 191, 0.15);
    }

    .arrow-icon {
      width: 14px;
      height: 14px;
      transition: transform 0.15s ease;
    }
  }

  .nav-menu {
    display: none;
    margin-top: 40px;

    @media (min-width: 1024px) {
      display: block;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: max-content;
    }

    li {
      margin-bottom: 0;
    }

    a {
      display: flex;
      align-items: center;
      padding: 10px 0;
      text-decoration: none;

      &.active,
      &:hover {
        .nav-indicator {
          width: 64px;
          background-color: var(--lightest-slate);
        }
        .nav-text {
          color: var(--lightest-slate);
        }
      }
    }

    .nav-indicator {
      display: block;
      height: 1px;
      width: 32px;
      margin-right: 16px;
      background-color: var(--dark-slate);
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .nav-text {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--dark-slate);
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  .social-list {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 32px 0 0 0;

    li {
      margin-right: 20px;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--slate);
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover,
      &:focus {
        color: var(--lightest-slate);
        transform: translateY(-3px);
      }

      svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: currentColor;

        &.feather-codeforces,
        path[fill] {
          fill: currentColor;
        }
      }
    }
  }
`;

const navItems = [
  { name: 'About', url: '#about' },
  { name: 'Experience', url: '#experience' },
  { name: 'Projects', url: '#projects' },
  { name: 'Certificates', url: '#certificates' },
  { name: 'Contact', url: '#contact' },
];

const Nav = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'certificates', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledHeader>
      <div className="header-top">
        <h1 className="name">
          <a href="/">Mansour Tarek</a>
        </h1>

        <h2 className="title">Backend & Full Stack Developer</h2>
        <p className="tech-subtitle">PHP • Laravel • Flutter</p>
        <p className="tagline">
          I build scalable backend systems, robust RESTful APIs, and high-performance web and mobile applications.
        </p>

        <nav className="nav-menu" aria-label="In-page jump links">
          <ul>
            {navItems.map(({ name, url }) => {
              const id = url.substring(1);
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <a href={url} className={isActive ? 'active' : ''}>
                    <span className="nav-indicator" />
                    <span className="nav-text">{name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="social-list" aria-label="Social media">
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                <Icon name={name} />
              </a>
            </li>
          ))}
      </ul>
    </StyledHeader>
  );
};

export default Nav;






