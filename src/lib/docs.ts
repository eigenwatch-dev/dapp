import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDir = path.join(process.cwd(), "src/docs");

export function getAllDocs() {
  const files = fs.readdirSync(docsDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(docsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
      };
    });
}

export function getDocBySlug(slug: string) {
  const fullPath = path.join(docsDir, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    title: data.title || slug.replace(/-/g, " "),
    content,
  };
}
