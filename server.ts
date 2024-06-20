import { isUrlAllowed } from "./helpers/allowed-urls-helper.ts";

export async function run(
  port: number,
  route: string,
  allowedUrls: string,
  allowedOrigins: string,
) {
  const allowedUrlsRules = allowedUrls.split(',').filter(_ => !!_)
  const allowAllUrls = allowedUrlsRules.length === 0

  const handler = async (req: Request) =>
  {
    const url = new URL(req.url)
    const path = url.href.substring(url.origin.length)
    try {
      if (path.startsWith(route)) {
        const proxiedUrl = path.slice(route.length);
        if (!allowAllUrls && !isUrlAllowed(proxiedUrl, allowedUrlsRules)) {
          return new Response("403 Forbidden", { status: 403 });
        }
        const response = await fetch(proxiedUrl);
        const text = await response.text();
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", allowedOrigins);
        return new Response(text, { headers })
      } else {
        return new Response("404 Not Found", { status: 404 });
      }
    } catch {
      return new Response("500 Internal Server Error", { status: 500 });
    }
  }

  const server = Deno.serve({ port }, handler)
  console.log(`CORS proxy server listening at port ${port}.`);
  await server.finished
}
