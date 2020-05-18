import React from 'react';

export const ExamplePage = (props: { index: number }) => {
    return (
        <div>
            <div>Example Page Content</div>
            <div>This is page: {props.index}</div>
            <div><a href={`/test-${props.index - 1}`}>Prev</a></div>
            <div><a href={`/test-${props.index + 1}`}>Next</a></div>
        </div>
    );
};
