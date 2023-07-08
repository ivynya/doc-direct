# document

Use Notion to publish a document to the web with custom URL and branding.

> ⚠️ Uses unofficial notion-to-md and @notionhq/client packages to allow for Deno Deploy. Will be removed once Deploy supports NPM. 

## Deploying Doc Direct

1. Create a Notion integration from the developers console
2. Paste token into `.env` file with format in `.env.example`
3. `docker build -t doc-direct .`
4. `docker run -p 8000:8000 -d doc-direct`
5. Open `localhost:8000` to verify functionality
6. Use an NGINX reverse proxy / etc to deploy on web with your URL

## Publishing a Notion page

1. Add your Notion integration to a root page
2. Create a page inside of the root page
3. Copy the link of your new page that looks like this: `https://www.notion.so/ivynya/Hello-05cc30bbbd844528b1558d80e3041a5c`
4. Navigate to `localhost:8000/p/05cc30bbbd844528b1558d80e3041a5c` to view that page in Doc Direct

## Editing branding

Edit the `content/index.html` file's inline CSS with whatever styles you desire, then redeploy.

## Notable OSS

Deno Oak
Notion to MD
Notion Client
