'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: ScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', triggerOnce = true } = options;
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

export function useStaggeredAnimation(
    itemCount: number,
    isVisible: boolean,
    delayMs: number = 120
): boolean[] {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(
        new Array(itemCount).fill(false)
    );

    useEffect(() => {
        if (!isVisible) {
            setVisibleItems(new Array(itemCount).fill(false));
            return;
        }

        const timers: NodeJS.Timeout[] = [];
        for (let i = 0; i < itemCount; i++) {
            timers.push(
                setTimeout(() => {
                    setVisibleItems((prev) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                    });
                }, i * delayMs)
            );
        }

        return () => timers.forEach(clearTimeout);
    }, [isVisible, itemCount, delayMs]);

    return visibleItems;
}
