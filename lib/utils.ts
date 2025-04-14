import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param text - The string to convert to a slug
 * @param separator - The character to use as a separator (default: '-')
 * @returns A lowercase string with special characters removed and spaces replaced with the separator
 */
export function slugify(text: string, separator: string = "-"): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars except spaces and hyphens
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(/-+/g, separator) // Replace multiple separators with single separator
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing separators
}
