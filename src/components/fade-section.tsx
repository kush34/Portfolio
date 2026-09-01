"use client";

// components/FadeSection.tsx
import { motion, type Variants } from "framer-motion";

export const fadeInBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 120,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function FadeSection({ children, className }: Props) {
  return (
    <motion.section
      variants={fadeInBlur}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}