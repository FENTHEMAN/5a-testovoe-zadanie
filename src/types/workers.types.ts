export type Contacts = {
    email: string;
    telegram: string;
    phone: string;
    rocketChat: string;
};

export type WorkerTeam = {
    lead: string;
    deputy: string;
    subdivision: string;
    teamName: string;
};

export type Skill = {
    id: string;
    name: string;
};

export type Vacation = {
    id: string;
    startDate: string;
    endDate: string;
    vacationName: string;
};

export type Worker = {
    id: string;
    name: string;
    contacts: Contacts;
    workerTeam: WorkerTeam;
    skills: Skill[];
    vacations: Vacation[];
};
