

export interface project {
    id: number;
    title: string;
    techstack: string[];
    description: string;
    gitlink?: string;
    image: string;
    liveLink?: string;
    altImage: string;
}

export interface company {
    name: string
    position: string,
    time: string,
    points: string[],
    link: string;
    imageLink: string,
    altImage: string
}

export interface blog {
    title: string,
    content: string,
    time: string,
    link: string
}