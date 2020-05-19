import React from 'react';
import { Markdown } from '../components/markdown';
import './post.markdown.css';
import './post.code.css';
import './post.css';

export type PostIndexPageData = {
    posts: { sitePath: string, title: string, summary: string }[];
}

export const PostIndexPage = (props: { data: PostIndexPageData }) => {
    const { posts } = props.data;

    return (
        <>
            <div style={{ display: `block`, minWidth: `100%`, backgroundColor: `#fafafa`, color: `#222222` }}>
                <div>Posts: </div>
                <div>
                    {posts.map(x => (
                        <div key={x.title} style={{ margin: `8px` }}>
                            <div style={{ backgroundColor: `#888888`, margin: 0, padding: 0 }}>
                                <a href={x.sitePath} >{x.title}</a>
                            </div>
                            <div style={{ margin: 0, padding: 0 }}>
                                <Markdown markdown={x.summary} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
