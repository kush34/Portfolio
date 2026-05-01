import React, { useEffect, useRef, useState } from 'react';

const PikachuCursor: React.FC = () => {
    const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const pikachuRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const elementRef = useRef<HTMLDivElement>(null);
    const isMovingRef = useRef<boolean>(false);
    const rotationRef = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevMovingRef = useRef<boolean>(false);

    const [isFast, setIsFast] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [gifKey, setGifKey] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY };

            if (!isMovingRef.current) {
                isMovingRef.current = true;
                setIsMoving(true);
            }

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                isMovingRef.current = false;
                setIsMoving(false);
            }, 500);
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
            setIsFast(prev => prev !== isCurrentlyFast ? isCurrentlyFast : prev);

            const ease = isCurrentlyFast ? 0.15 : 0.08;
            pikachuRef.current.x += dx * ease;
            pikachuRef.current.y += dy * ease;

            if (isMovingRef.current && distance > 5) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                rotationRef.current = angle;
                setFlipped(Math.abs(angle) > 90);
            } else if (!isMovingRef.current) {
                rotationRef.current = 0;
                setFlipped(false);
            }

            elementRef.current.style.transform = `translate3d(${pikachuRef.current.x}px, ${pikachuRef.current.y}px, 0) rotate(${rotationRef.current}deg)`;

            requestRef = requestAnimationFrame(animate);
        };

        requestRef = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // restart GIF on state change
    useEffect(() => {
        if (prevMovingRef.current !== isMoving) {
            prevMovingRef.current = isMoving;
            setGifKey(prev => prev + 1);
        }
    }, [isMoving]);

    const src = isMoving
        ? `./runPicka.gif?v=${gifKey}`
        : `./sleepingPicka.gif?v=${gifKey}`;

    return (
        <div
            ref={elementRef}
            className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform -mt-10 -ml-10"
        >
            <div className={`transition-transform duration-300 ${isFast ? 'scale-110' : 'scale-100'}`}>
                <img
                    key={gifKey}
                    src={src}
                    alt="Pikachu"
                    className="w-15 h-15 object-contain"
                    style={{
                        transform: flipped ? 'scaleX(-1)' : 'none',
                        transition: 'transform 0.15s'
                    }}
                />
            </div>
        </div>
    );
};

export default PikachuCursor;