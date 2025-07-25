export interface Resource {
  id: string;
  href: string;
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  id: string;
  description: string;
  image?: string;
}

export interface SidebarSec {
  label: string;
  items: {
    id: string;
    label: string;
  }[];
}

export interface Reflections {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  statement: string;
  videoUrl: string;
  image: string;
  tags: string[];
  year: number;
  objective: string;
  tools: string[];
  steps: Step[];
  concepts: string[];
  reflections: Reflections[];
  resources: Resource[];
  sidebar?: SidebarSec[];

  [key: string]:
    | string
    | number
    | string[]
    | Resource[]
    | Step[]
    | SidebarSec[]
    | undefined;
}
