import React from 'react';

export type ExamplePageData = {
    index?: number;
    title?: string;
    content?: string;
};

export const ExamplePage = (props: { data: ExamplePageData }) => {
    const { index, title, content } = props.data;
    return (
        <div>
            <div>Example Page: {title ?? ``}</div>
            {index != null && (
                <>
                    <div>This is page: {index}</div>
                    <div><a href={`/test-${index - 1}`}>Prev</a></div>
                    <div><a href={`/test-${index + 1}`}>Next</a></div>
                </>
            )}

            <pre>{content}</pre>
        </div>
    );
};
