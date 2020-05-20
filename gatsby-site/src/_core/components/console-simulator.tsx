import './console-simulator.css';
import React, { useState } from 'react';

export const ConsoleSimulator = () => {
    const [text, setText] = useState(``);
    const hitEnter = () => {
        setText(``);
    };

    return (
        <div className='console-simulator' style={{ display: `inline-block` }}>
            <span>{`>`}</span>
            <span>{text}</span>
            <span className='console-simulator-cursor'>&nbsp;</span>
            <input type='text' style={{ opacity: 0 }} value={text} onChange={x => setText(x.target.value)} onKeyPress={e => e.key === `Enter` && hitEnter()} />
        </div>
    );
};
