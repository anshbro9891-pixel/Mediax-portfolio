import { promises as fs } from "fs";
import path from "path";

export type ProjectCategory = "Web" | "Branding" | "Social" | "Video";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  link: string;
  featured: boolean;
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating: number;
  photo: string;
};

export type Settings = {
  agencyName: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  behance: string;
  dribbble: string;
  stats: {
    projects: number;
    clients: number;
    years: number;
  };
  heroImage: string;
  aboutImage: string;
};

const dataDir = path.join(process.cwd(), "data");

const resolveFile = (filename: string) => path.join(dataDir, filename);

export async function readJsonFile<T>(filename: string): Promise<T> {
  const file = await fs.readFile(resolveFile(filename), "utf-8");
  return JSON.parse(file) as T;
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await fs.writeFile(resolveFile(filename), `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export const getProjects = () => readJsonFile<Project[]>("projects.json");
export const getServices = () => readJsonFile<Service[]>("services.json");
export const getTestimonials = () => readJsonFile<Testimonial[]>("testimonials.json");
export const getSettings = () => readJsonFile<Settings>("settings.json");
