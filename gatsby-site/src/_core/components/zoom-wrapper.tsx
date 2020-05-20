/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { ReactNode, useRef, useState, useEffect } from 'react';
import { storeState } from '../store';

const moduleState = {
    scale: storeState.zoom,
    setScale: (x: number) => { moduleState.scale = x; storeState.zoom = x; },
};

export const ZoomWrapper = (props: { children: ReactNode }) => {

    const element = useRef(null as null | HTMLDivElement);

    const [scale, setScale] = useState(1);
    const zoomScale = (direction: 'in' | 'out') => {
        const targetScale = moduleState.scale * (direction === `out` ? 0.9 : 1 / 0.9);
        setScale(targetScale);
        moduleState.setScale(targetScale);
    };

    // useEffect(() => {
    //     const unsub = globalState.subscribe(() => { setScale(globalState.scale); });
    //     return () => {
    //         unsub.unsubscribe();
    //     };
    // }, []);

    const overflow = `scroll`;
    return (
        <div className='zoom-wrapper' >
            <div ref={element} style={{ overflowX: overflow }}>
                <div style={{ transform: `scale(${scale})`, transformOrigin: `top left`, width: `calc(100%/${scale})` }} >
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
            <div style={{ position: `absolute`, top: 4, right: 64, height: 16, width: 16, backgroundColor: `#FF0000` }} onClick={() => zoomScale(`out`)} />
            <div style={{ position: `absolute`, top: 4, right: 32, height: 16, width: 16, backgroundColor: `#00FF00` }} onClick={() => zoomScale(`in`)} />
        </div >
    );
};
