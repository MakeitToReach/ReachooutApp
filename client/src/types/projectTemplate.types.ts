export interface TemplateItem {
  projectId: string;
  templateId: string;
  order: number;
  slug: string;
  expiresAt: Date | null;
  template: {
    id: string;
    name: string;
    thumbnailUrl: string;
    tags: string[];
  };
  project: {
    id: string;
    name: string;
    subDomain: string;
    customDomain: string | null;
    description: string | null;
  };
}
