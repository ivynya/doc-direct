import { Application, Router, Client } from "./deps.ts";
import { getPageMarkdown } from "./download.ts";

const notion = new Client({ auth: Deno.env.get("NOTION_TOKEN") });

/* Application logic */
const app = new Application();
const router = new Router();

router
  .get("/d/:id", ctx => {
    ctx.response.body = getPageMarkdown(notion, ctx.params.id);
  })
  .get("/p/:id", async ctx => {
    const index = `${Deno.cwd()}/content/index.html`;
    let md = await getPageMarkdown(notion, ctx.params.id);
    md = md.replaceAll("`", "\\`");
    let html = await Deno.readTextFile(index);
    html = html.replaceAll("%REPLACE_MARKDOWN_STRING%", md);
    ctx.response.body = html;
  });

app.use(router.routes());
app.use(router.allowedMethods());

/* Start server */
console.log(`[EVT] Listening on :8000`);
await app.listen({ port: 8000 });