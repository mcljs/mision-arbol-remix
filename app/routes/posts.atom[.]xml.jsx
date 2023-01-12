import { GenerateFeed } from "../utils/feed.server";

export const loader = async ({ request }) => {
  const feed = await GenerateFeed(request);
  const rss = feed.atom1();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/atom+xml",
      "Content-Length": String(Buffer.byteLength(rss)),
    },
  });
};