import React, { useEffect, useState } from 'react';

export const AsciiArtViewer = (props: { art: string, animate?: { fps: number, draw: (timeMs: number) => string }, autoAnimate?: { fps: number, replacements: { find: string, replace: string, ratio: number }[] } }) => {
    const [art, setArt] = useState(props.art);

    const { animate: animateRaw, autoAnimate } = props;

    useEffect(() => {
        const animate = animateRaw ?? autoAnimate ? {
            fps: autoAnimate?.fps ?? 100,
            draw: (t: number): string => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const autoAnim = autoAnimate!;

                let v = props.art;
                for (const a of autoAnim.replacements) {
                    v = v.replace(new RegExp(a.find, `g`), (x) => Math.random() < a.ratio ? a.replace : x);
                }

                return v;
            },
        } : null;

        if (!animate) { return; }

        const timeStartMs = Date.now();
        const draw = () => {
            setArt(animate.draw(Date.now() - timeStartMs));
        };
        const id = setInterval(draw, 1000 / animate.fps);
        draw();

        // eslint-disable-next-line consistent-return
        return () => clearInterval(id);
    }, [animateRaw, autoAnimate, autoAnimate?.fps, props.art]);

    return (
        <div>
            <span style={{ fontFamily: `monospace`, whiteSpace: `pre` }} >{art}</span>
        </div>
    );
};
