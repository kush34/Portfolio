"use client";

import React, { useEffect, useRef, useState } from 'react';

const PikachuCursor: React.FC = () => {
    const cursorRef = useRef({ x: 0, y: 0 });
    const pikachuRef = useRef({ x: 0, y: 0 });

    const elementRef = useRef<HTMLDivElement>(null);

    const isMovingRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isFast, setIsFast] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [gifKey, setGifKey] = useState(0);

    // true = Pikachu is moving left
    const [flipped, setFlipped] = useState(false);

    const prevMovingRef = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current = {
                x: e.clientX,
                y: e.clientY,
            };

            if (!isMovingRef.current) {
                isMovingRef.current = true;
                setIsMoving(true);
            }

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                isMovingRef.current = false;
                setIsMoving(false);
            }, 400);
        };

        window.addEventListener('mousemove', handleMouseMove);

        let requestRef: number;

        const animate = () => {
            if (!elementRef.current) return;

            const targetX = cursorRef.current.x + 25;
            const targetY = cursorRef.current.y + 30;

            const dx = targetX - pikachuRef.current.x;
            const dy = targetY - pikachuRef.current.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const isCurrentlyFast = distance > 150;

            setIsFast((prev) =>
                prev !== isCurrentlyFast ? isCurrentlyFast : prev
            );

            const ease = isCurrentlyFast ? 0.15 : 0.08;

            pikachuRef.current.x += dx * ease;
            pikachuRef.current.y += dy * ease;

            /*
             * Determine which direction Pikachu is moving.
             *
             * dx > 0  -> moving RIGHT
             * dx < 0  -> moving LEFT
             *
             * Your GIF naturally faces RIGHT,
             * so we flip it only when moving LEFT.
             */
            if (isMovingRef.current && Math.abs(dx) > 2) {
                setFlipped(dx < 0);
            }

            /*
             * IMPORTANT:
             *
             * Don't rotate the Pikachu.
             * The running GIF already contains the correct
             * running animation.
             *
             * We only move it and flip it horizontally.
             */
            elementRef.current.style.transform = `
                translate3d(
                    ${pikachuRef.current.x}px,
                    ${pikachuRef.current.y}px,
                    0
                )
            `;

            requestRef = requestAnimationFrame(animate);
        };

        requestRef = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);

            cancelAnimationFrame(requestRef);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    /*
     * Restart the GIF whenever Pikachu changes
     * between running and sleeping.
     */
    useEffect(() => {
        if (prevMovingRef.current !== isMoving) {
            prevMovingRef.current = isMoving;

            setGifKey((prev) => prev + 1);
        }
    }, [isMoving]);

    const src = isMoving
        ? `/runPicka.gif?v=${gifKey}`
        : `/sleepingPicka.gif?v=${gifKey}`;

    return (
        <div
            ref={elementRef}
            className="
                fixed
                top-0
                left-0
                pointer-events-none
                z-50
                will-change-transform
                -mt-10
                -ml-10
            "
        >
            <div
                className={`
                    transition-transform
                    duration-300
                    ${isFast ? 'scale-110' : 'scale-100'}
                `}
            >
                <img
                    key={gifKey}
                    src={src}
                    alt=""
                    className="w-16 h-16 object-contain"
                    style={{
                        /*
                         * GIF naturally faces RIGHT.
                         *
                         * flipped = true
                         *      => scaleX(-1)
                         *      => Pikachu faces LEFT
                         */
                        transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',

                        transition: 'transform 0.15s ease',
                    }}
                />
            </div>
        </div>
    );
};

export default PikachuCursor;
