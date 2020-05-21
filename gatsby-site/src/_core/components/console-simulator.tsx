/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import './console-simulator.css';
import React, { useState, useRef } from 'react';

export const ConsoleSimulator = (props: { initialPrompt: string, onCommand: (command: string) => { output?: string, prompt?: string, quit?: boolean } }) => {
    const elementInput = useRef(null as null | HTMLInputElement);
    const focusOnInput = () => {
        elementInput.current?.focus();
    };

    const [isFocused, setIsFocused] = useState(false);
    const [command, setCommand] = useState(``);
    const hitEnter = () => {
        const l = lines;
        l.push({ prefix: `${prompt} `, text: command });

        const result = props.onCommand(command);
        result.output?.split(`\n`).map(x => x.trim()).filter(x => x).forEach(x => l.push({ prefix: ``, text: x }));
        if (result.prompt) {
            setPrompt(result.prompt);
        }
        if (result.quit) {
            setLines([]);
            setCommand(``);
            setPrompt(props.initialPrompt);
            setIsExpanded(false);
            return;
        }

        setLines(l);
        setCommand(``);
        setIsExpanded(true);

        if (elementInput.current) {
            const rect = elementInput.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetScroll = rect.top + scrollTop - window.innerHeight * 0.5;
            if (targetScroll > 0) {
                window.scrollTo(0, targetScroll);
            }
        }
    };

    const [prompt, setPrompt] = useState(props.initialPrompt);
    const [lines, setLines] = useState([] as { prefix: string, text: string }[]);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='console-simulator' style={{ display: isExpanded ? `block` : `inline-block` }} onClick={focusOnInput}>
            {isExpanded && (lines.map(x => (
                <div>
                    <span>{x.prefix}</span>
                    <span>{x.text}</span>
                </div>
            )))}
            <div style={{ display: isExpanded ? `block` : `inline-block` }}>
                <span>{prompt} </span>
                <span>{command}</span>
                <span className='console-simulator-cursor' style={isFocused ? {} : { backgroundColor: `#000000` }}>&nbsp;</span>
                <input type='text'
                    ref={elementInput}
                    style={{ opacity: 0 }}
                    autoCorrect='off' autoCapitalize='none'
                    value={command}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={x => setCommand(x.target.value)}
                    onKeyPress={e => e.key === `Enter` && hitEnter()} />
            </div>
        </div>
    );
};
