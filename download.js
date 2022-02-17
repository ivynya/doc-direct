
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import yargs from "yargs";
import "dotenv/config";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const args = yargs(process.argv.slice(2))
  .option("page", {  alias: 'p' })
  .argv;

(async () => {
  const page = await notion.pages.retrieve({ page_id: args.page});
  const title = page.properties.title.title[0].text.content;
  const mdblocks = await n2m.pageToMarkdown(args.page);
  let mdString = n2m.toMarkdownString(mdblocks);

  mdString = `# ${title}\n\n` + mdString;

  // writing to file
  fs.writeFile(`content/${args.page}.md`, mdString, (err) => {
    console.log(err);
  });
})();