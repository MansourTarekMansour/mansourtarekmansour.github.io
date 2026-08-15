import React from 'react';
import styled from 'styled-components';

const StyledContactSection = styled.section`
  margin-bottom: 96px;
  scroll-margin-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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

  .contact-title {
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 700;
    color: var(--lightest-slate);
    margin-bottom: 16px;
  }

  .contact-text {
    font-size: 16px;
    line-height: 1.6;
    color: var(--slate);
    max-width: 480px;
    margin: 0 auto 32px auto;
  }

  .email-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    border: 1px solid var(--teal);
    border-radius: 4px;
    background-color: rgba(45, 212, 191, 0.08);
    color: var(--teal);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    margin: 0 auto;

    &:hover,
    &:focus {
      background-color: rgba(45, 212, 191, 0.18);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(45, 212, 191, 0.15);
    }
  }
`;

const Contact = () => (
  <StyledContactSection id="contact" aria-label="Contact information">
    <div className="sticky-mobile-header">
      <h2>Contact</h2>
    </div>

    <h3 className="contact-title">Get In Touch</h3>
    <p className="contact-text">
      Whether you have a question, a project proposal, or just want to say hi, my inbox is always open!
      Feel free to reach out and I’ll do my best to get back to you.
    </p>

    <a className="email-button" href="mailto:mansourtarek100@gmail.com">
      Say Hello 👋
    </a>
  </StyledContactSection>
);

export default Contact;
