import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const gradientDegrees = [
  "bg-gradient-10",
  "bg-gradient-15",
  "bg-gradient-20",
  "bg-gradient-25",
  "bg-gradient-30",
  "bg-gradient-45",
  "bg-gradient-60",
  "bg-gradient-90",
  "bg-gradient-120",
  "bg-gradient-135",
];

export const getRandomDegree = () => {
  const randomIndex = Math.floor(Math.random() * gradientDegrees.length);
  return gradientDegrees[randomIndex];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
