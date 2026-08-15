import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  margin-bottom: 96px;
  scroll-margin-top: 96px;
  padding-top: 0;

  @media (max-width: 1023px) {
    margin-bottom: 64px;
    scroll-margin-top: 64px;
  }

  .sticky-mobile-header {
    position: sticky;
    top: 0;
    z-index: 20;
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: 16px;
    width: calc(100% + 48px);
    background-color: rgba(15, 23, 42, 0.75);
    padding: 20px 24px;
    backdrop-filter: blur(12px);

    @media (min-width: 1024px) {
      display: none;
    }

    h2 {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--lightest-slate);
      margin: 0;
    }
  }

  .about-wrapper {
    position: relative;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .profile-pic-container {
    position: relative;
    margin: 0 auto 24px auto;
    width: 200px;

    @media (min-width: 640px) {
      float: right;
      margin: 0 0 20px 28px;
      width: 220px;
    }

    .wrapper {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid rgba(94, 234, 212, 0.4);
      box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.8), 0 0 20px rgba(45, 212, 191, 0.15);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        border-color: var(--teal);
        transform: translateY(-6px);
        box-shadow: 0 25px 50px -12px rgba(45, 212, 191, 0.3), 0 0 25px rgba(45, 212, 191, 0.25);
      }

      .img {
        display: block;
        width: 100%;
        border-radius: 10px;

        img {
          border-radius: 10px;
          object-fit: cover;
        }
      }
    }
  }

  .bio-text {
    p {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 1.6;
      color: var(--slate);

      a {
        font-weight: 500;
        color: var(--lightest-slate);
        text-decoration: none;

        &:hover,
        &:focus {
          color: var(--teal);
        }
      }
    }
  }

  .skills-pills {
    clear: both;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 24px 0 0 0;

    li {
      margin-right: 8px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      border-radius: 9999px;
      background-color: var(--teal-tint);
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.25;
      color: var(--teal);
    }
  }

  .about-resume-wrapper {
    margin-top: 24px;

    .about-resume-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      border: 1px solid var(--teal);
      border-radius: 4px;
      color: var(--teal);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover,
      &:focus {
        background-color: var(--teal-tint);
        transform: translateY(-2px);
      }

      .arrow-icon {
        width: 14px;
        height: 14px;
        transition: transform 0.15s ease;
      }

      &:hover .arrow-icon {
        transform: translate(2px, -2px);
      }
    }
  }
`;

const About = () => {
  const skills = [
    'PHP',
    'Laravel',
    'MySQL',
    'PostgreSQL',
    'REST APIs',
    'Redis Cache',
    'CI/CD',
    'Database Design',
    'MVC / HMVC',
    'Clean Architecture',
    'Flutter',
    'Dart',
    'Firebase',
    'C/C++',
    'Algorithms & Data Structures',
    'HTML & CSS',
    'Figma',
    'Postman',
    'Jira',
    'WordPress',
  ];

  return (
    <StyledAboutSection id="about" aria-label="About me">
      <div className="sticky-mobile-header">
        <h2>About</h2>
      </div>

      <div className="about-wrapper">
        <div className="profile-pic-container">
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpeg"
              width={400}
              quality={95}
              formats={['AUTO', 'WEBP']}
              alt="Mansour Tarek Headshot"
            />
          </div>
        </div>

        <div className="bio-text">
          <p>
            Hello! I’m Mansour Tarek, a Software Engineer and Backend Developer specializing in building
            scalable backend systems, robust RESTful APIs, and cross-platform applications.
          </p>
          <p>
            With a strong foundation in data structures, algorithms, and an active background in competitive programming
            on <a href="https://codeforces.com/profile/mansour.tarek" target="_blank" rel="noreferrer">Codeforces</a>,
            I focus on engineering high-performance, efficient, and maintainable software solutions.
          </p>
          <p>
            Over the past few years, I’ve had the privilege of engineering backend systems for ride-sharing platforms at{' '}
            <a href="https://www.linkedin.com/company/zeem-sa/" target="_blank" rel="noreferrer">Zeem</a>, delivering web dashboards at{' '}
            <a href="https://www.linkedin.com/company/syntrum-solutions/posts/?feedView=all" target="_blank" rel="noreferrer">Syntrum Solutions</a>, and instructing competitive programming and computer science courses for national initiatives.
          </p>
        </div>

        <ul className="skills-pills" aria-label="Technologies and skills">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>

        <div className="about-resume-wrapper">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="about-resume-btn">
            <span>View Full Résumé</span>
            <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </StyledAboutSection>
  );
};

export default About;








