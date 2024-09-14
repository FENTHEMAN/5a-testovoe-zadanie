export type Team = {
    id: string;
    name: string;
    link: string;
    leads: Lead[];
    deputies: Deputy[];
    subdivisions: Subdivision[];
};

export type Subdivision = {
    name: string;
    link: string;
};

export type Lead = {
    name: string;
    link: string;
};

export type Deputy = {
    name: string;
    link: string;
};
