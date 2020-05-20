import './post.css';
import React from 'react';
import { Link } from 'gatsby';
import { Markdown } from '../components/markdown';
import { SEO } from './layout/seo';
import { Layout } from './layout/layout';

export type PostIndexPageData = {
    posts: { sitePath: string, title: string, summary: string }[];
}

export const PostIndexPage = (props: { data: PostIndexPageData }) => {
    const { posts } = props.data;

    return (
        <Layout>
            <SEO title='Posts' />
            <div style={{ display: `block`, minWidth: `100%` }}>
                <div>
                    {posts.map(x => (
                        <div key={x.title} className='post-item'>
                            <div>
                                <p>
                                    <Link to={x.sitePath}>{x.title}</Link>
                                </p>
                            </div>
                            <div>
                                <Markdown markdown={x.summary} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
