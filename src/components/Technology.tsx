"use client";

import { technology } from "@/types";
import { motion } from "framer-motion";

const Tech = ({ name, Icon, color }: technology) => {

    return (
        <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground hover:shadow transition-shadow">
            {Icon && <span className={color}>{Icon({ size: 18 })}</span>}
            <span>{name}</span>
        </motion.span>
    );
};

export default Tech;
