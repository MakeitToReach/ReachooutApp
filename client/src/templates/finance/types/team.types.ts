export type F_TEAM_MEMBER ={
    imgUrl: string;
    name: string;
    designation: string;
}

export interface F_TEAM_SECTION {
    heading: string;
    team: F_TEAM_MEMBER[];
}
