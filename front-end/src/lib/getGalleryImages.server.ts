"use server";
import { promises as fs } from "fs";
import path from "path";

export async function getGalleryImages() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  let imageFiles: string[] = [];
  try {
    imageFiles = await fs.readdir(galleryDir);
  } catch (e) {
    return [];
  }
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  return imageFiles
    .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()))
    .map((file) => `/gallery/${file}`);
} 