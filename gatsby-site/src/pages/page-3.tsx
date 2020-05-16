// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, Link } from 'gatsby';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

// Because if we are forced to use export default, it should be nameless (only for pages)
export default (props: PageProps) => (
  <Layout>
    <SEO title='Page 3' />
    <h1>Hi from the 3rd  page</h1>
    <p>Welcome to page 3 ({props.path})</p>
    <Link to='/'>Go back to the homepage</Link>
  </Layout>
);
