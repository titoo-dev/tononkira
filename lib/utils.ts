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

/**
 * Formats a number with K (thousands) or M (millions) suffixes for better readability
 * @param num - The number to format
 * @param digits - The number of decimal places to show (default: 1)
 * @returns Formatted string with appropriate suffix
 */
export const formatNumber = (num: number, digits: number = 1): string => {
  if (num === 0) return "0";

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);

  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
