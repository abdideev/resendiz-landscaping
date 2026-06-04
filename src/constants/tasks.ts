import { Pencil, Hammer, Leaf } from "lucide-react";
import type { TaskPillar } from "@/types/tasks";

export const TASK_PILLARS: readonly TaskPillar[] = [
  {
    id: "design",
    icon: Pencil,
    title: "Design",
    description:
      "Our licensed Landscape Architecture staff specializes in creating aesthetically pleasing, yet functional solutions for each unique project.",
  },
  {
    id: "build",
    icon: Hammer,
    title: "Build",
    description:
      "Serving as general contractor for all needs outside the home, we are equipped for every aspect of the project from initial grading to hardscapes, softscapes, and everything in between.",
  },
  {
    id: "maintain",
    icon: Leaf,
    title: "Maintain",
    description:
      "We offer full-service landscape maintenance including lawn, plant, and tree care, as well as lighting, irrigation, and pool maintenance.",
  },
] as const;
