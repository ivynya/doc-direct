import { NotionToMarkdown } from "./deps.ts";

export async function getPageMarkdown(notion: any, pageId: string) {
  // get page title
  const page = await notion.pages.retrieve({ page_id: pageId });
  const title = page.properties.title.title[0].text.content;
  // get page content
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return `# ${title}\n\n` + mdString;
}