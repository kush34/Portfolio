"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_MS = 1500;
// the sprite trails the pointer instead of covering it
const OFFSET = { x: -15, y: -10 };

const PikachuCursor: React.FC = () => {
    const boxRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [sleeping, setSleeping] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let idle: ReturnType<typeof setTimeout> | undefined;
        let lastX = 0;
        let placed = false;
        let facingLeft = false;

        const handleMouseMove = (e: MouseEvent) => {
            const box = boxRef.current;
            const img = imgRef.current;
            if (!box || !img) return;

            if (!placed) {
                // snap to the pointer on the first move, so the sprite
                // does not glide in from the top-left corner
                placed = true;
                box.style.transition = "none";
                box.style.transform = `translate3d(${e.clientX + OFFSET.x}px, ${e.clientY + OFFSET.y}px, 0)`;
                box.getBoundingClientRect(); // flush, so the snap is instant
                box.style.transition = "";
                setVisible(true);
            } else {
                box.style.transform = `translate3d(${e.clientX + OFFSET.x}px, ${e.clientY + OFFSET.y}px, 0)`;
            }

            // flip only when the pointer actually changes horizontal direction
            const dx = e.clientX - lastX;
            if (Math.abs(dx) > 1 && dx < 0 !== facingLeft) {
                facingLeft = dx < 0;
                img.style.transform = facingLeft ? "scaleX(-1)" : "none";
            }
            lastX = e.clientX;

            setSleeping(false);
            clearTimeout(idle);
            idle = setTimeout(() => setSleeping(true), IDLE_MS);
        };

        const hide = () => {
            setVisible(false);
            setSleeping(true);
            placed = false;
        };

        // don't leave the sprite stuck in the corner once the pointer leaves
        const handleVisibility = () => {
            if (document.hidden) hide();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseleave", hide);
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseleave", hide);
            document.removeEventListener("visibilitychange", handleVisibility);
            clearTimeout(idle);
        };
    }, []);

    return (
        <div
            ref={boxRef}
            aria-hidden
            style={{ visibility: visible ? "visible" : "hidden" }}
            className="
                pointer-events-none
                fixed
                top-0
                left-0
                z-50
                will-change-transform
                transition-transform
                duration-150
                ease-out
                motion-reduce:transition-none
            "
        >
            <img
                ref={imgRef}
                src="/runPicka.gif"
                alt=""
                width={64}
                height={64}
                className={`h-16 w-16 object-contain transition-opacity duration-200 ${
                    sleeping ? "opacity-0" : "opacity-100"
                }`}
            />
            <img
                src="/sleepingPicka.gif"
                alt=""
                width={64}
                height={64}
                className={`absolute top-0 left-0 h-16 w-16 object-contain transition-opacity duration-200 ${
                    sleeping ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
};

export default PikachuCursor;
