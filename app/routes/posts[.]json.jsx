import { GenerateFeed } from "~/utils/feed.server";

export const loader = async ({ request }) => {
  const feed = await GenerateFeed(request);
  const rss = feed.rss2();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": String(Buffer.byteLength(rss)),
    },
  });
};