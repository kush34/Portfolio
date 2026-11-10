import React from "react";

interface BackgroundPatternProps {
  className?: string;
}

// Ambient background: three drifting mesh-gradient blobs softened by a real
// blur on a static wrapper (grid pattern removed). Transform-only children =
// GPU cheap, foreground stays crisp.
export default function BackgroundPattern({ className = "" }: BackgroundPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -z-10 fixed inset-0 overflow-hidden select-none ${className}`}
    >
      <div
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{ filter: "blur(72px)" }}
      >
        <div
          className="animate-blob-drift motion-reduce:animate-none absolute -top-56 -left-40 h-[40rem] w-[40rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(246,130,31,0.14), rgba(246,130,31,0.06) 45%, transparent 68%)",
            animationDelay: "-8s",
          }}
        />
        <div
          className="animate-blob-drift motion-reduce:animate-none absolute top-1/3 -right-64 h-[46rem] w-[46rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12), rgba(59,130,246,0.05) 45%, transparent 66%)",
            animationDelay: "-30s",
            animationDuration: "55s",
          }}
        />
        <div
          className="animate-blob-drift motion-reduce:animate-none absolute -bottom-72 left-1/4 h-[38rem] w-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,230,0,0.08), transparent 62%)",
            animationDelay: "-20s",
            animationDuration: "50s",
          }}
        />
      </div>
    </div>
  );
}
