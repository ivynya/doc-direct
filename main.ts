
import { Application, Router, send } from "./deps.ts";

/* Application logic */
const app = new Application();
const router = new Router();

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

router
  .get("/d/:id", ctx => {
    Deno.run({ cmd: ["node", "./download.js", '-p', ctx.params.id] });
    ctx.response.body = "OK";
  })
  .get("/p/:id", async ctx => {
    const index = `${Deno.cwd()}/content/index.html`;
    const md = `${Deno.cwd()}/content/${ctx.params.id}.md`;
    try {
      await Deno.readFile(md);
      ctx.response.body = await Deno.readFile(index);
      // Update file
      Deno.run({ cmd: ["node", "./download.js", '-p', ctx.params.id] });
    }
    catch (e) {
      Deno.run({ cmd: ["node", "./download.js", '-p', ctx.params.id] });
      timeout(1000);
      ctx.response.body = await Deno.readFile(index);
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

/* Static file serving (publish widget + usercontent) */
app.use(async (ctx) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/content`,
      index: 'index.html',
    });
  } catch (e) {
    console.log(`[ERR] ${e.name} - ${ctx.request.url}`);
    ctx.response.status = 404;
  }
})

/* Start server */
console.log(`[EVT] Listening on :8000`);
await app.listen({ port: 8000 });