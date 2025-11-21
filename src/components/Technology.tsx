import { technology } from "@/types";

const Tech = ({ name, Icon, color }: technology) => {

    return (
        <span className={`tech ${color} inline-flex items-center gap-2 text-sm px-3 py-2 rounded`}>
            {Icon && <Icon />}
            <span>{name}</span>
        </span>
    );
};

export default Tech;
