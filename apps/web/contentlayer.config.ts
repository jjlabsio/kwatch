import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import { codeImport } from "remark-code-import";
import rehypeSlug from "rehype-slug";
import highlight from "rehype-highlight";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `blog/**/*.mdx`,
  markdown: { fileExtensions: ["mdx", "md"] }, // Ensure it watches these files
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [rehypeSlug, highlight],
  },
});
