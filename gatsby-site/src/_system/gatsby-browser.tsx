import React, { ReactNode } from 'react';
import { getStoreState } from '../_core/store';

getStoreState();

export const wrapPageElement = (props: { element: ReactNode, props: unknown }) => {
    return (
        <>
            {props.element}
        </>
    );
};
