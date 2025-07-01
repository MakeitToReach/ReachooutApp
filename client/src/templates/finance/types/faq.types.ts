export type FFAQ_ITEM = {
    question: string;
    answer: string;
}
export interface FFAQ_SECTION {
    heading: string;
    faqs: FFAQ_ITEM[];
}
