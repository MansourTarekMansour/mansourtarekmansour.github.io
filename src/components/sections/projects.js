import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import Icon from '../icons/icon';

const StyledProjectsSection = styled.section`
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

  .projects-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &:hover .project-card:not(:hover) {
      opacity: 0.5;
    }
  }

  .project-card {
    position: relative;
    display: grid;
    gap: 16px;
    padding-bottom: 4px;
    margin-bottom: 48px;
    transition: opacity 0.3s ease;

    @media (min-width: 640px) {
      grid-template-columns: repeat(8, minmax(0, 1fr));
      gap: 24px;
    }

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

    .project-thumbnail {
      position: relative;
      z-index: 10;
      margin-top: 4px;

      @media (min-width: 640px) {
        grid-column: span 3 / span 3;
      }

      .thumbnail-box {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 6px;
        border: 2px solid rgba(148, 163, 184, 0.1);
        background-color: rgba(15, 23, 42, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--teal);
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 0.05em;
        overflow: hidden;
        transition: border-color 0.2s ease;

        img,
        .gatsby-image-wrapper {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
        }

        .gatsby-image-wrapper img {
          object-fit: contain !important;
        }
      }
    }

    &:hover .thumbnail-box {
      border-color: rgba(94, 234, 212, 0.3);
    }

    .card-content {
      position: relative;
      z-index: 10;

      @media (min-width: 640px) {
        grid-column: span 5 / span 5;
      }
    }

    .project-title {
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

      .arrow-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        vertical-align: middle;
        transition: transform 0.15s ease;
      }
    }

    .project-description {
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

    .project-links {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 14px;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--slate);
        transition: all 0.2s ease;
        position: relative;
        z-index: 20;

        &:hover,
        &:focus {
          color: var(--teal);
          transform: translateY(-2px);
        }

        svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }
      }
    }
  }

  .more-projects-btn-wrapper {
    margin-top: 32px;

    .more-projects-btn {
      background: transparent;
      color: var(--teal);
      border: 1px solid var(--teal);
      border-radius: 4px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover,
      &:focus {
        background-color: var(--teal-tint);
      }
    }
  }
`;

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              playstore
              appstore
              cover {
                childImageSharp {
                  gatsbyImageData(width: 300, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              playstore
              appstore
            }
            html
          }
        }
      }
    }
  `);

  const featuredList = data.featured.edges;
  const projectsList = data.projects.edges;
  const allProjects = [...featuredList, ...projectsList];

  const hiddenTitles = ['Laragigs', 'Lost', 'My Meals', 'News App', 'Todo'];
  const mainProjects = allProjects.filter(({ node }) => !hiddenTitles.includes(node.frontmatter.title));
  const hiddenProjects = allProjects.filter(({ node }) => hiddenTitles.includes(node.frontmatter.title));

  const displayedProjects = showMore ? [...mainProjects, ...hiddenProjects] : mainProjects;

  return (
    <StyledProjectsSection id="projects" aria-label="Selected projects">
      <div className="sticky-mobile-header">
        <h2>Projects</h2>
      </div>

      <ul className="projects-list">
        {displayedProjects &&
          displayedProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, tech, external, github, playstore, appstore, cover } = frontmatter;
            const linkUrl = external || github || playstore || appstore || '#';
            const image = cover ? getImage(cover) : null;

            return (
              <li key={i} className="project-card">
                <div className="card-backdrop" />

                <div className="project-thumbnail">
                  <div className="thumbnail-box">
                    {image ? (
                      <GatsbyImage image={image} alt={title} />
                    ) : (
                      <span>{title.substring(0, 16)}</span>
                    )}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="project-title">
                    <a href={linkUrl} target="_blank" rel="noreferrer" aria-label={title}>
                      <span>{title}</span>
                      <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </h3>

                  <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />

                  {tech && tech.length > 0 && (
                    <ul className="tech-pills" aria-label="Technologies used">
                      {tech.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links" aria-label="Project links">
                    {github && (
                      <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub Repository" title="GitHub Repository">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {playstore && (
                      <a href={playstore} target="_blank" rel="noreferrer" aria-label="Google Play Store" title="Google Play Store">
                        <Icon name="PlayStore" />
                      </a>
                    )}
                    {appstore && (
                      <a href={appstore} target="_blank" rel="noreferrer" aria-label="Apple App Store" title="Apple App Store">
                        <Icon name="AppStore" />
                      </a>
                    )}
                    {external && !playstore && !appstore && !github && (
                      <a href={external} target="_blank" rel="noreferrer" aria-label="Live Demo Link" title="Live Demo">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      {hiddenProjects.length > 0 && (
        <div className="more-projects-btn-wrapper">
          <button className="more-projects-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : `Show More Projects (${hiddenProjects.length})`}
          </button>
        </div>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
