export type F_STAT = {
    statNumber: string;
    statText: string;
    statDescription: string;
    statIcon: string;
}
export interface F_STATS_SECTION {
    heading: string;
    stats: F_STAT[];
    imgUrl: string;
    btn1Text: string;
    btn1Link: string;
    btn2Text: string;
    btn2Link: string;
}
