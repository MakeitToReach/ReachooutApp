export type PF_TEAM_MEMBER = {
    avatar: string;
    name: string;
    designation: string;
}
export interface PF_TEAM_MEMBER_SECTION {
    title: string;
    subtitle: string;
    teamMembers: PF_TEAM_MEMBER[];
}
