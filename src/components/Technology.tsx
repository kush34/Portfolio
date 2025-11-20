import { technology } from "@/types";

const Tech = ({ name, Icon }: technology) => {
    return (
        <span className="inline-flex items-center gap-2 border-2 border-dashed border-gray-400 text-sm px-3 py-2 rounded">
            {Icon && <Icon />}
            <span>{name}</span>
        </span>
    );
};

export default Tech;
