import React, { ReactNode, useRef, useState, useEffect } from 'react';


export const CodeWrapper_Zoom = (props: { children: ReactNode }) => {

    const ZOOM_SIZE = 256;

    const element = useRef(null as null | HTMLDivElement);
    const zoomElement = useRef(null as null | HTMLDivElement);
    const mouseState = useRef(false);

    const [scale, setScale] = useState(1);

    const mouseEvents = useRef((() => {
        const onMouseDown = () => { mouseState.current = true; };
        const onMouseUp = () => { mouseState.current = false; };
        const onMouseMove = (e: { clientX: number, clientY: number }) => {
            if (!zoomElement.current) { return; }
            if (!mouseState.current) { return; }
            const rect = zoomElement.current.getBoundingClientRect();
            const mTarget = e.clientX - rect.left;
            setScale(mTarget / (ZOOM_SIZE * 0.5));
        };
        return {
            onMouseDown,
            onMouseUp,
            onMouseMove,
        };
    })());

    useEffect(() => {
        const {
            onMouseDown,
            onMouseUp,
            onMouseMove,
        } = mouseEvents.current;

        // window.addEventListener(`mousedown`, onMouseDown);
        window.addEventListener(`mouseup`, onMouseUp);
        window.addEventListener(`mousemove`, onMouseMove);
        return () => {
            // window.removeEventListener(`mousedown`, onMouseDown);
            window.removeEventListener(`mouseup`, onMouseUp);
            window.removeEventListener(`mousemove`, onMouseMove);
        };
    }, []);

    const overflow = `scroll`;
    return (
        <div>
            <div className='code-wrapper' ref={element} style={{ overflowX: overflow }}>
                <div style={{ transform: `scale(${scale})`, transformOrigin: `top left` }} >
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
            <div style={{ position: `absolute`, top: 8, right: 32, height: 8, width: ZOOM_SIZE, backgroundColor: `#FF0000` }}
                role='button'
                tabIndex={0}
                ref={zoomElement}
                onMouseDown={() => mouseEvents.current.onMouseDown()}
            >
                <div style={{ position: `absolute`, top: -4, left: ZOOM_SIZE * 0.5 * scale - 8, height: 16, width: 16, backgroundColor: `#00FF00` }} />
            </div>
        </div >
    );
};