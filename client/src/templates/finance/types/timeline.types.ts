export type F_TIMELINE_STEP = {
    badgeText: string;
    image: string;
    title: string;
    description: string;
};

export interface F_TIMELINE_SECTION {
    title: string;
    subtitle: string;
    steps: F_TIMELINE_STEP[];
}
