import React from 'react';

export const ExamplePage = (props: { index?: number, content?: string }) => {
    return (
        <div>
            <div>Example Page Content</div>
            {props.index != null && (
                <>
                    <div>This is page: {props.index}</div>
                    <div><a href={`/test-${props.index - 1}`}>Prev</a></div>
                    <div><a href={`/test-${props.index + 1}`}>Next</a></div>
                </>
            )}

            <div>{props.content}</div>
        </div>
    );
};
