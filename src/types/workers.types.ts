export interface Contacts {
    email: string;
    telegram: string;
    phone: string;
    rocketChat: string;
}

export interface WorkerTeam {
    lead: string;
    deputy: string;
    subdivision: string;
    teamName: string;
}

export interface Skill {
    name: string;
}

export interface Hobby {
    name: string;
}

export interface Vacation {
    startDate: string;
    endDate: string;
    vacationName: string;
}

export interface Worker {
    id?: string;
    name: string;
    isFree: boolean;
    description: string;
    timeZone: string;
    city: string;
    birthDate: string;
    inTeamDate: string;
    post: string;
    photo: string;
    contacts: Contacts;
    workerTeam: WorkerTeam;
    skills: Skill[];
    vacations: Vacation[];
    hobbies: Hobby[];
}
