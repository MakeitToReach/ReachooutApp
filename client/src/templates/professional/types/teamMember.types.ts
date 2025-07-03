export type PF_TEAM_MEMBER = {
  imgUrl: string;
  name: string;
  designation: string;
  description: string;
  socials: {
    name: string;
    url?: string;
  }[];
};

export interface PF_TEAM_MEMBER_SECTION {
  title: string;
  subtitle: string;
  teamMembers: PF_TEAM_MEMBER[];
}
