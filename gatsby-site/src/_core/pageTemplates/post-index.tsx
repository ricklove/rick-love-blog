import './post.markdown.css';
import './post.code.css';
import './post.css';
import React from 'react';
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
                        <div key={x.title} style={{ margin: `0` }}>
                            <div style={{ margin: 0, padding: 0 }}>
                                <a href={x.sitePath} >{x.title}</a>
                            </div>
                            <div style={{ margin: 0, padding: 0 }}>
                                <Markdown markdown={x.summary} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
