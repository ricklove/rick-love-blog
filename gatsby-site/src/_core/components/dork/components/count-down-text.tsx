import React, { useState, useEffect } from 'react';
import { ConCommandResult } from '../../console-simulator-types';
import { GameAction } from '../types';

export const CountDownTimer = (props: { time: number, color?: string, messageAfterTime?: string, onTime: () => void }) => {
    const [time, setTime] = useState(10);
    useEffect(() => {
        const timeStart = Date.now();
        const id = setInterval(() => {
            const timeRemaining = ((props.time * 1000) - (Date.now() - timeStart)) / 1000;
            setTime(s => timeRemaining);
            if (timeRemaining < 0) {
                clearInterval(id);
                props.onTime();
            }
        }, 10);
        return () => clearInterval(id);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <>
            <span style={{ color: props.color ?? `#FF0000` }}>{time > 0 ? time : props.messageAfterTime ?? `0.000`}</span>
        </>
    );
};

export const triggerTimedMessage = async (
    onMessage: (message: ConCommandResult) => void,
    immediateResult: ConCommandResult,
    time: number, color: 'danger' | 'warning' | 'normal',
    getResultAfterTime: () => GameAction,
): Promise<GameAction> => {

    const colorActual = color === `danger` ? `#FF0000`
        : (color === `warning` ? `#FFFF00`
            : `#7777FF`);

    return new Promise(resolve => {
        const Component = () => (<CountDownTimer time={time} color={colorActual} onTime={() => {
            resolve({ output: ``, ...getResultAfterTime(), addDivider: true });
        }} />);
        onMessage({
            ...immediateResult,
            Component,
        });
    });
};
