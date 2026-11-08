"use client";

import React, { useId } from "react";

export type PatternVariant =
  | "cloudflare-dashed" // Dashed lines + plus intersection crosses (Cloudflare Blog)
  | "grid"              // Solid clean lines + plus intersection crosses
  | "dots"              // Dot matrix pattern
  | "crosses";          // Floating plus / cross markers only

interface BackgroundPatternProps {
  /**
   * The visual style of the pattern.
   * Default: "cloudflare-dashed" (matches blog.cloudflare.com)
   */
  variant?: PatternVariant;
  /**
   * Spacing of the grid cells in pixels.
   * Default: 64
   */
  size?: number;
  /**
   * Stroke width in pixels for the lines/crosses.
   * Default: 1
   */
  strokeWidth?: number;
  /**
   * Length of the cross arms at the intersection in pixels.
   * Default: 4
   */
  crossSize?: number;
  /**
   * Dash array for dashed variants (e.g. "4 4" or "3 5").
   * Default: "4 4"
   */
  dashArray?: string;
  /**
   * Mask effect to fade the background:
   * - "radial": soft spotlight vignette from center out
   * - "bottom": fades out smoothly towards the bottom
   * - "none": full uniform pattern
   * Default: "radial"
   */
  mask?: "radial" | "bottom" | "none";
  /**
   * Optional subtle glow effect in the hero/top area (Cloudflare style warm/blue glow)
   */
  showGlow?: boolean;
  glowColor?: "orange" | "blue" | "neutral";
  /**
   * Additional Tailwind classes applied to the root container.
   */
  className?: string;
}

export default function BackgroundPattern({
  variant = "cloudflare-dashed",
  size = 64,
  strokeWidth = 1,
  crossSize = 4,
  dashArray = "4 4",
  mask = "radial",
  showGlow = false,
  glowColor = "orange",
  className = "",
}: BackgroundPatternProps) {
  const patternId = useId();

  // Mask styles
  const maskStyle: React.CSSProperties =
    mask === "radial"
      ? {
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)",
        }
      : mask === "bottom"
      ? {
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
        }
      : {};

  const glowStyles = {
    orange:
      "bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(246,130,31,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(246,130,31,0.08),transparent_70%)]",
    blue: "bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)]",
    neutral:
      "bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
    >
      {/* Optional Cloudflare-style atmospheric top ambient glow */}
      {showGlow && (
        <div
          className={`absolute top-0 left-0 right-0 h-[600px] w-full ${glowStyles[glowColor]}`}
        />
      )}

      {/* Pattern SVG */}
      <svg
        className="absolute inset-0 h-full w-full stroke-zinc-400/35 text-zinc-400/35 dark:stroke-zinc-700/40 dark:text-zinc-700/40"
        style={maskStyle}
      >
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            {/* 1. Cloudflare Dashed Grid */}
            {variant === "cloudflare-dashed" && (
              <>
                {/* Horizontal dashed line */}
                <line
                  x1="0"
                  y1="0"
                  x2={size}
                  y2="0"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                />
                {/* Vertical dashed line */}
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={size}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                />
                {/* Intersection Cross (+) at grid vertices */}
                <path
                  d={`M${-crossSize} 0 H${crossSize} M0 ${-crossSize} V${crossSize}`}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                />
              </>
            )}

            {/* 2. Solid Grid with Crosshairs */}
            {variant === "grid" && (
              <>
                <line
                  x1="0"
                  y1="0"
                  x2={size}
                  y2="0"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={size}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                />
                <path
                  d={`M${-crossSize} 0 H${crossSize} M0 ${-crossSize} V${crossSize}`}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                />
              </>
            )}

            {/* 3. Floating Crosses Only */}
            {variant === "crosses" && (
              <path
                d={`M${-crossSize} 0 H${crossSize} M0 ${-crossSize} V${crossSize}`}
                stroke="currentColor"
                strokeWidth={strokeWidth}
              />
            )}

            {/* 4. Dot Matrix */}
            {variant === "dots" && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={1.2}
                fill="currentColor"
              />
            )}
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
