import React, { useEffect, useRef, useState } from 'react';

const PikachuCursor: React.FC = () => {
    const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const pikachuRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const elementRef = useRef<HTMLDivElement>(null);

    const isMovingRef = useRef<boolean>(false);
    const rotationRef = useRef<number>(0);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isFast, setIsFast] = useState<boolean>(false);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY };

            isMovingRef.current = true;
            setIsMoving(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                isMovingRef.current = false;
                setIsMoving(false);
            }, 200);
        };

        window.addEventListener('mousemove', handleMouseMove);

        let requestRef: number;

        const animate = () => {
            if (!elementRef.current) return;

            const targetX = cursorRef.current.x + 25;
            const targetY = cursorRef.current.y + 30;
            const currentX = pikachuRef.current.x;
            const currentY = pikachuRef.current.y;

            const distX = targetX - currentX;
            const distY = targetY - currentY;

            const distance = Math.sqrt(distX * distX + distY * distY);

            const speedThreshold = 150;
            const isCurrentlyFast = distance > speedThreshold;
            if (isCurrentlyFast !== isFast) setIsFast(isCurrentlyFast);

            const ease = isCurrentlyFast ? 0.15 : 0.08;
            pikachuRef.current.x += distX * ease;
            pikachuRef.current.y += distY * ease;

            if (isMovingRef.current && distance > 5) {
                const angle = Math.atan2(distY, distX) * (180 / Math.PI);
                if (Math.abs(angle - rotationRef.current) > 1) {
                    rotationRef.current = angle;
                    setRotation(angle);
                }
            } else if (!isMovingRef.current) {
                if (rotationRef.current !== 0) {
                    rotationRef.current = 0;
                    setRotation(0);
                }
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
    }, [isFast]);

    const getImageSource = (): string => {
        if (!isMoving) return "./sleepingPicka.gif";
        if (isFast) return "./runPicka.gif";
        return "./runPicka.gif";
    };

    return (
        <div
            ref={elementRef}
            className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform -mt-10 -ml-10"
        >
            <div className="relative flex items-center justify-center">
                <div className={`transition-all duration-300 z-10 ${isFast ? 'scale-110' : 'scale-100'}`}>
                    <img
                        key={isMoving ? 'moving' : 'sleeping'}
                        src={getImageSource()}
                        alt="Pikachu Cursor"
                        className="w-15 h-15 object-contain"
                        style={{
                            transform: (isMoving && Math.abs(rotation) > 90) ? 'scaleY(-1)' : 'none',
                            transition: 'transform 0.2s'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PikachuCursor;