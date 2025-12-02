import { technology } from "@/types";
import { motion } from "framer-motion";

const Tech = ({ name, Icon, color }: technology) => {

    return (
        <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }} className={`tech ${color} inline-flex items-center gap-2 text-sm px-2 py-1 md:px-3 md:py-2`}>
            {Icon && <Icon />}
            <span>{name}</span>
        </motion.span>
    );
};

export default Tech;
