import './post.markdown.css';
import './post.code.css';
import './post.css';
import React from 'react';
import { Markdown } from '../components/markdown';
import { SEO } from './layout/seo';
import { Layout } from './layout/layout';

export type PostPageData = {
    sourceFilePath: string;
    sourceFileContent: string;
    headers: { key: string, value: string }[];

    title: string;
    body: string;
    summary: string;
};

export const PostPage = (props: { data: PostPageData }) => {
    const { body, headers, title } = props.data;

    return (
        <Layout>
            <SEO title={title} />
            <div style={{ display: `block`, minWidth: `100%` }}>
                <div>{title}</div>
                <div>
                    {headers.map(x => (
                        <div key={x.key} style={{ display: `flex`, flexDirection: `row` }}>
                            <div style={{ minWidth: `100px` }}>{x.key}</div>
                            <div style={{}}>{x.value}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <Markdown markdown={body} />
                </div>
            </div>
        </Layout>
    );
};
