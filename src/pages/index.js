import React from 'react';
import PropTypes from 'prop-types';
import { Layout, About, Jobs, Projects, Certificates, Contact } from '@components';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <About />
    <Jobs />
    <Projects />
    <Certificates />
    <Contact />
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;


