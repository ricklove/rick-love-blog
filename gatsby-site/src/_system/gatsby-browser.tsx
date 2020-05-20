import React, { ReactNode } from 'react';
import { storeState, StoreContext } from '../_core/store';

export const wrapPageElement = (props: { element: ReactNode, props: unknown }) => {
    return (
        <>
            <StoreContext.Provider value={storeState} >
                {props.element}
            </StoreContext.Provider>
        </>
    );
};
