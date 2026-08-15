import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledExperienceSection = styled.section`
  margin-bottom: 96px;
  scroll-margin-top: 96px;

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

  .experience-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &:hover .experience-card:not(:hover) {
      opacity: 0.5;
    }
  }

  .experience-card {
    position: relative;
    display: grid;
    gap: 16px;
    padding-bottom: 4px;
    transition: opacity 0.3s ease;

    @media (min-width: 640px) {
      grid-template-columns: 140px 1fr;
      gap: 16px;
    }

    margin-bottom: 48px;

    .card-backdrop {
      position: absolute;
      inset: -16px -16px;
      z-index: 0;
      display: none;
      border-radius: 6px;
      transition: all 0.2s ease;

      @media (min-width: 1024px) {
        display: block;
      }
    }

    &:hover .card-backdrop {
      background-color: rgba(30, 41, 59, 0.5);
      box-shadow: inset 0 1px 0 0 rgba(148, 163, 184, 0.1);
    }

    .date-range {
      position: relative;
      z-index: 10;
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--dark-slate);
      white-space: nowrap;

      @media (min-width: 640px) {
        grid-column: span 1 / span 1;
      }
    }

    .card-content {
      position: relative;
      z-index: 10;

      @media (min-width: 640px) {
        grid-column: span 1 / span 1;
      }
    }



    .role-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.25;
      color: var(--lightest-slate);
      margin: 0 0 8px 0;

      a {
        display: inline-flex;
        align-items: baseline;
        color: inherit;
        text-decoration: none;

        &:before {
          content: '';
          position: absolute;
          inset: -16px -16px;
          display: none;

          @media (min-width: 1024px) {
            display: block;
          }
        }

        &:hover,
        &:focus {
          color: var(--teal);

          .arrow-icon {
            transform: translate(2px, -2px);
            color: var(--teal);
          }
        }
      }

      .company-name {
        display: inline-block;
      }

      .arrow-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        vertical-align: middle;
        transition: transform 0.15s ease;
      }
    }

    .job-description {
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--slate);

      p {
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }

      ul {
        padding-left: 0;
        list-style: none;
        li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 6px;
          &:before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--teal);
          }
        }
      }
    }

    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 16px 0 0 0;

      li {
        margin-right: 6px;
        margin-top: 6px;
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
  }

  .resume-link {
    margin-top: 48px;

    a {
      display: inline-flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      color: var(--lightest-slate);
      text-decoration: none;

      &:hover,
      &:focus {
        color: var(--teal);
        .arrow-icon {
          transform: translate(2px, -2px);
          color: var(--teal);
        }
      }

      .arrow-icon {
        width: 16px;
        height: 16px;
        margin-left: 4px;
        transition: transform 0.15s ease;
      }
    }
  }
`;

const getTechStack = (company) => {
  switch (company) {
    case 'Zeem':
      return ['Laravel', 'PHP', 'REST APIs', 'MySQL'];
    case 'Syntrum':
    case 'Syntrum Solutions':
      return ['Laravel', 'PHP', 'MySQL', 'Admin Dashboards'];
    case 'DECI':
      return ['C/C++', 'Data Structures', 'Algorithms', 'Udacity Curriculum'];
    case 'Dipdux':
    case 'Dipdux Analytica':
      return ['Flutter', 'Dart', 'Firebase', 'REST APIs'];
    case 'Coach Academy':
      return ['Algorithms', 'Data Structures', 'C++', 'Competitive Programming'];
    default:
      return ['PHP', 'Laravel', 'MySQL'];
  }
};

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  return (
    <StyledExperienceSection id="experience" aria-label="Work experience">
      <div className="sticky-mobile-header">
        <h2>Experience</h2>
      </div>

      <ol className="experience-list">
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range } = frontmatter;
            const techStack = getTechStack(company);

            return (
              <li key={i} className="experience-card">
                <div className="card-backdrop" />
                <header className="date-range">{range}</header>

                <div className="card-content">
                  <h3 className="role-title">
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" aria-label={`${title} at ${company}`}>
                        <span>
                          {title} · <span className="company-name">{company}</span>
                        </span>
                        <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span>
                        {title} · <span className="company-name">{company}</span>
                      </span>
                    )}
                  </h3>

                  <div className="job-description" dangerouslySetInnerHTML={{ __html: html }} />

                  <ul className="tech-pills" aria-label="Technologies used">
                    {techStack.map((tech, j) => (
                      <li key={j}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
      </ol>

      <div className="resume-link">
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
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
    </StyledExperienceSection>
  );
};

export default Jobs;

