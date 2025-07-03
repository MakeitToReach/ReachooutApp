export type PF_FAQ_ITEM = {
  question: string;
  answer: string;
};
export interface PF_FAQ_SECTION {
  heading: string;
  subHeading: string;
  faqs: PF_FAQ_ITEM[];
}
