export interface Resource {
  id: string;
  href: string;
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  videoUrl: string;
  image: string;
  tags: string[];
  year: number;
  objective: string;
  tools: string[];
  steps: string[];
  concepts: string[];
  reflections: string;
  resources: Resource[];

  sidebar?: {
    label: string;
    items: { id: string; label: string }[];
  }[];

  [key: string]:
    | string
    | number
    | string[]
    | Resource[]
    | { label: string; items: { id: string; label: string }[] }[]
    | undefined;
}
