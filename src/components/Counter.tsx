'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
    target: number;
    duration?: number;
    suffix?: string;
    visible: boolean;
}

export default function Counter({ target, duration = 2000, suffix = '', visible }: CounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!visible) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out cubic function for smoother finish
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(easeOutCubic * target));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [target, duration, visible]);

    return (
        <span>
            {count}{suffix}
        </span>
    );
}
