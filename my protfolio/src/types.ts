export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  value: number;
  suffix: string;
  label: string;
}
