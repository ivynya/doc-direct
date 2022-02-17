
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
  const mdblocks = await n2m.pageToMarkdown(args.page);
  const mdString = n2m.toMarkdownString(mdblocks);

  // writing to file
  fs.writeFile(`content/${args.page}.md`, mdString, (err) => {
    console.log(err);
  });
})();