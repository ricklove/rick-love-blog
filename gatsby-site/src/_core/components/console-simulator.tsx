/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import './console-simulator.css';
import React, { useState } from 'react';

export const ConsoleSimulator = (props: { initialDirectory: string, onCommand: (command: string) => string }) => {
    const [command, setCommand] = useState(``);
    const hitEnter = () => {
        const l = lines;
        l.push({ prefix: `${dir}> `, text: command });

        const result = props.onCommand(command);
        result.split(`\n`).map(x => x.trim()).filter(x => x).forEach(x => l.push({ prefix: ``, text: x }));

        setLines(l);
        setCommand(``);
        setIsExpanded(true);
    };

    const [dir, setDir] = useState(props.initialDirectory);
    const [lines, setLines] = useState([] as { prefix: string, text: string }[]);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='console-simulator' style={{ display: isExpanded ? `block` : `inline-block` }}>
            {isExpanded && (lines.map(x => (
                <div>
                    <span>{x.prefix}</span>
                    <span>{x.text}</span>
                </div>
            )))}
            <div style={{ display: isExpanded ? `block` : `inline-block` }}>
                <span>{`${isExpanded ? dir : ``}> `}</span>
                <span>{command}</span>
                <span className='console-simulator-cursor'>&nbsp;</span>
                <input type='text' style={{ opacity: 0 }} value={command} onChange={x => setCommand(x.target.value)} onKeyPress={e => e.key === `Enter` && hitEnter()} />
            </div>
        </div>
    );
};
