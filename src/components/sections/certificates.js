import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledCertificatesSection = styled.section`
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

  .category-flags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;

    .flag-btn {
      background: transparent;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 9999px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      color: var(--slate);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: var(--teal);
        border-color: var(--teal);
        background-color: var(--teal-tint);
      }

      &.active {
        color: var(--teal);
        border-color: var(--teal);
        background-color: var(--teal-tint);
        font-weight: 600;
      }
    }
  }

  .certificates-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &:hover .certificate-card:not(:hover) {
      opacity: 0.5;
    }
  }

  .certificate-card {
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

    .cert-thumb {
      position: relative;
      z-index: 10;
      margin-top: 4px;

      @media (min-width: 640px) {
        grid-column: span 3 / span 3;
      }

      .thumb-box {
        width: 100%;
        aspect-ratio: 16 / 10;
        border-radius: 6px;
        border: 2px solid rgba(148, 163, 184, 0.1);
        background-color: rgba(15, 23, 42, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
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

    &:hover .thumb-box {
      border-color: rgba(94, 234, 212, 0.3);
    }

    .card-content {
      position: relative;
      z-index: 10;

      @media (min-width: 640px) {
        grid-column: span 5 / span 5;
      }
    }

    .cert-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.25;
      color: var(--lightest-slate);
      margin: 0 0 4px 0;
    }

    .cert-issuer {
      font-size: 13px;
      font-weight: 500;
      color: var(--teal);
      margin-bottom: 8px;
    }

    .cert-desc {
      font-size: 14px;
      line-height: 1.5;
      color: var(--slate);
      margin-bottom: 12px;
    }

    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 12px 0 0 0;

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

  .more-certs-btn-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: center;

    .more-certs-btn {
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

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllInAllCategory, setShowAllInAllCategory] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      certImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { in: ["png", "jpg", "jpeg"] }
        }
      ) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(width: 300, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP])
            }
          }
        }
      }
    }
  `);

  const categories = [
    'All',
    'PHP & Laravel',
    'Flutter & Mobile',
    'Competitive Programming',
    'Data Structures & Algorithms',
    'C & Linux Systems',
    'Front End',
    'OOP',
  ];

  const certificatesData = [
    {
      title: 'Africa & Arab Collegiate Programming Championship (ACPC 2021)',
      issuer: 'ACPC / ICPC',
      category: 'Competitive Programming',
      description: 'Qualified contestant and competitive programmer solving complex algorithmic & data structure problems under timed contest conditions.',
      skills: ['Algorithms', 'Data Structures', 'C++', 'Competitive Programming'],
      searchPath: '2022-ACPC2021-Mr. mansour tarek-PLACE-1',
    },
    {
      title: 'Egyptian Collegiate Programming Contest (ECPC)',
      issuer: 'ECPC / ICPC',
      category: 'Competitive Programming',
      description: 'Achieved top placement rank in regional collegiate programming contest (ThebesCPC / ECPC 2020-2022).',
      skills: ['Problem Solving', 'Data Structures', 'Algorithms', 'C++'],
      searchPath: '2022-ICPC Thebes CPC-Mr. mansour tarek-PLACE-1',
    },
    {
      title: 'Flutter Mobile Developer Internship Certificate',
      issuer: 'Dipdux Analytica',
      category: 'Flutter & Mobile',
      description: 'Completed intensive mobile application engineering internship building cross-platform mobile features using Flutter, Dart, and Firebase.',
      skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
      searchPath: 'Flutter - Mobile Development/Internship completion Certificate-1',
    },
    {
      title: 'Backend Developer Internship Certificate',
      issuer: 'Syntrum Solutions',
      category: 'PHP & Laravel',
      description: 'Engineered backend APIs and admin dashboards using PHP, Laravel, and MySQL database management systems.',
      skills: ['PHP', 'Laravel', 'MySQL', 'REST APIs'],
      searchPath: 'PHP Laravel - Backend Development/Internship completion Certificate-1',
    },
    {
      title: 'C Programming with Linux Professional Certificate (Part 1)',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Comprehensive professional credential series covering memory management, pointers, and low-level Linux systems.',
      skills: ['C', 'Linux', 'Memory Management'],
      searchPath: 'Professional Certificate _ edX Credentials-1',
    },
    {
      title: 'Syntrum Solutions Employment Experience Verification',
      issuer: 'Syntrum Solutions',
      category: 'PHP & Laravel',
      description: 'Official employment verification letter detailing key responsibilities in backend software development.',
      skills: ['PHP', 'Laravel', 'Backend Systems'],
      searchPath: 'PHP Laravel - Backend Development/Hr letter-1',
    },
    {
      title: 'Flutter & Dart Development Certificate',
      issuer: 'Udemy',
      category: 'Flutter & Mobile',
      description: 'Comprehensive mobile application engineering credential covering Clean Architecture, Cubit, and Firebase.',
      skills: ['Flutter', 'Dart', 'Clean Architecture', 'Cubit'],
      searchPath: 'Flutter - Mobile Development/UC-aedeee1a-3747-4351-94a0-ae0fc9d89b4f-1',
    },
    {
      title: 'ACPC 2021 Regional Contestant Achievement Certificate',
      issuer: 'ACPC / ICPC Regional Steering Committee',
      category: 'Competitive Programming',
      description: 'Official contest qualification certificate awarded for performance in the Africa & Arab regional championship.',
      skills: ['Competitive Programming', 'Algorithms', 'C++'],
      searchPath: 'Three Hundred and Ninety Ninth PlaceContestant458067',
    },
    {
      title: 'ICPC Thebes Regional Contestant Certificate (2021)',
      issuer: 'ICPC / Thebes Academy',
      category: 'Competitive Programming',
      description: 'Qualified contestant certificate in regional collegiate programming contest.',
      skills: ['Problem Solving', 'Data Structures', 'Algorithms'],
      searchPath: '2021-ThebesCPC2020-Mr. mansour tarek-PLACE-1',
    },
    {
      title: 'ECPC 3rd Place Regional Contestant Award',
      issuer: 'Egyptian Collegiate Programming Contest',
      category: 'Competitive Programming',
      description: 'Awarded 3rd place honors in regional collegiate competitive programming contest.',
      skills: ['Competitive Programming', 'C++', 'Algorithms'],
      searchPath: 'Third PlaceContestant468120-1',
    },
    {
      title: 'ECPC 8th Place Regional Contestant Award',
      issuer: 'Egyptian Collegiate Programming Contest',
      category: 'Competitive Programming',
      description: 'Awarded 8th place rank in national collegiate programming contest.',
      skills: ['Problem Solving', 'Algorithms', 'Data Structures'],
      searchPath: 'Eighth PlaceContestant422491-1',
    },
    {
      title: 'ECPC Solid Programmers Distinction Award',
      issuer: 'Egyptian Collegiate Programming Contest',
      category: 'Competitive Programming',
      description: 'Special distinction certificate for high speed & accuracy in algorithmic problem solving.',
      skills: ['Competitive Programming', 'Algorithms', 'C++'],
      searchPath: 'Solid ProgrammersContestant468120-1',
    },
    {
      title: 'Data Structures & Algorithms Masterclass Certificate',
      issuer: 'Udemy / Coach Academy',
      category: 'Data Structures & Algorithms',
      description: 'Advanced algorithmic training covering graph theory, dynamic programming, tree traversals, and data structure design.',
      skills: ['Algorithms', 'Data Structures', 'Graph Theory', 'C++'],
      searchPath: 'UC-711b5505-3431-419d-ad6f-b9cd9299220f',
    },
    {
      title: 'Data Structures Specialization Certificate',
      issuer: 'Coach Academy',
      category: 'Data Structures & Algorithms',
      description: 'In-depth certificate on fundamental and advanced data structures design and efficiency analysis.',
      skills: ['Data Structures', 'Algorithms', 'Optimization'],
      searchPath: 'Data Structure & Algorithms/Certificate-1',
    },
    {
      title: 'C Programming with Linux Professional Certificate (Part 2)',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Advanced systems programming credential focusing on Linux command-line utilities and pointer arithmetic.',
      skills: ['C', 'Linux', 'Systems Programming'],
      searchPath: 'Professional Certificate _ edX Credentials2-1',
    },
    {
      title: 'C Programming: Getting Started',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Core concepts of procedural programming in C, compilation tools, and variable management.',
      skills: ['C', 'Procedural Programming', 'GCC'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.01 Certificate _ edX-1',
    },
    {
      title: 'C Programming: Language Foundations',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Logic structures, conditionals, loops, and function design in C.',
      skills: ['C', 'Control Structures', 'Functions'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.02 Certificate _ edX-1',
    },
    {
      title: 'C Programming: Modular Programming and Memory Management',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Memory allocation, dynamic arrays, stack/heap layout, and pointer manipulation.',
      skills: ['C', 'Pointers', 'Memory Allocation'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.03 Certificate _ edX-1',
    },
    {
      title: 'C Programming: Pointers and Memory Management',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Advanced pointer arithmetic, multidimensional arrays, and memory safety.',
      skills: ['C', 'Pointers', 'Memory Management'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.04 Certificate _ edX-1',
    },
    {
      title: 'C Programming: Advanced Data Types',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Custom structs, linked lists, memory layout, and typedef abstractions.',
      skills: ['C', 'Structs', 'Linked Lists'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.05 Certificate _ edX-1',
    },
    {
      title: 'Linux: Getting Started',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Linux shell scripting, file permissions, directory navigation, and process controls.',
      skills: ['Linux', 'Bash', 'Shell Scripting'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.06 Certificate _ edX-1',
    },
    {
      title: 'Linux: Advanced Commands',
      issuer: 'Dartmouth College & edX',
      category: 'C & Linux Systems',
      description: 'Command-line text processing, grep, sed, awk, system services, and build automation.',
      skills: ['Linux', 'Bash', 'Automation'],
      searchPath: 'Dartmouth_IMTx DART.IMT.C.07 Certificate _ edX-1',
    },
    {
      title: 'Object Oriented Programming in Java',
      issuer: 'Coursera / Duke University',
      category: 'OOP',
      description: 'Mastered core object-oriented principles, inheritance, polymorphism, and modular software design.',
      skills: ['Java', 'OOP', 'Software Design'],
      searchPath: 'Coursera PPWNTTDZFYVV-1',
    },
    {
      title: 'Front End Web Development Certification',
      issuer: 'Udacity / FWD',
      category: 'Front End',
      description: 'Web development fundamentals, semantic HTML5, modern CSS, and JavaScript UI interactions.',
      skills: ['HTML5', 'CSS3', 'JavaScript'],
      searchPath: 'f6d258f4-6b4c-429b-9125-4c781c78738f-1',
    },
  ];

  const filteredCerts = certificatesData.filter((cert) => {
    if (activeCategory === 'All') return true;
    return cert.category === activeCategory;
  });

  const displayedCerts =
    activeCategory === 'All' && !showAllInAllCategory ? filteredCerts.slice(0, 5) : filteredCerts;

  const getCertImageNode = (searchPath) => {
    if (!searchPath) return null;
    const searchLower = searchPath.toLowerCase();
    const found = data.certImages.edges.find(({ node }) => {
      const relLower = node.relativePath.toLowerCase();
      const nameLower = node.name.toLowerCase();
      return relLower.includes(searchLower) || nameLower.includes(searchLower);
    });
    return found ? getImage(found.node) : null;
  };

  return (
    <StyledCertificatesSection id="certificates" aria-label="Certificates and Achievements">
      <div className="sticky-mobile-header">
        <h2>Certificates & Achievements</h2>
      </div>

      <div className="category-flags" aria-label="Filter certificates by category flags">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`flag-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat);
              setShowAllInAllCategory(false);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="certificates-list">
        {displayedCerts.map((cert, i) => {
          const imgData = getCertImageNode(cert.searchPath);
          return (
            <li key={i} className="certificate-card">
              <div className="card-backdrop" />

              <div className="cert-thumb">
                <div className="thumb-box">{imgData && <GatsbyImage image={imgData} alt={cert.title} />}</div>
              </div>

              <div className="card-content">
                <h3 className="cert-title">
                  <span>{cert.title}</span>
                </h3>
                <div className="cert-issuer">{cert.issuer}</div>
                <p className="cert-desc">{cert.description}</p>

                <ul className="tech-pills" aria-label="Skills certified">
                  {cert.skills.map((skill, j) => (
                    <li key={j}>{skill}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      {activeCategory === 'All' && (
        <div className="more-certs-btn-wrapper">
          <button className="more-certs-btn" onClick={() => setShowAllInAllCategory(!showAllInAllCategory)}>
            {showAllInAllCategory ? 'Show Top 5 Featured' : `Show All Certificates (${certificatesData.length})`}
          </button>
        </div>
      )}
    </StyledCertificatesSection>
  );
};

export default Certificates;
