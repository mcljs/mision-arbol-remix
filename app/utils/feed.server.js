import { Feed } from "feed";
import { json } from "@remix-run/node";
import { getPostListings } from "../models/post.server";


import { getDomainUrl } from "./misc";

export const loader = async () => {
    const posts = await getPostListings();
    return json({ posts });
  };

export async function GenerateFeed(request) {
    const posts = await getPostListings();
  const baseUrl = getDomainUrl(request);
  const blogUrl = `${baseUrl}/posts`;

  

  const feed = new Feed({
    copyright: `Copyright © ${new Date().getFullYear()}, Fundacion Mision Arbol`,
    id: blogUrl,
    title: "Misión Arbol Noticias",
    author: {
      link: baseUrl,
      name: "Mision Arbol",
    },
    description: "Blog posts by Mision Arbol",
    favicon: `${baseUrl}/favicon.ico`,
    feedLinks: {
      atom: `${blogUrl}/atom.xml`,
      json: `${blogUrl}.json`,
      rss: `${blogUrl}/rss.xml`,
    },
    generator: "@fundamiarbolven",
    language: "es",
    link: blogUrl,
  });

    posts.forEach((post) => { 
        feed.addItem({
            title: post.title,
            id: `${blogUrl}/${post.slug}`,
            guid: `${blogUrl}/${post.slug}`,
            link: `${blogUrl}/${post.slug}`,
            description: post.description,
            image: `${baseUrl}/uploads/${post.imageUrl}`,
            published: new Date(post.createdAt),
    });

    });
  return feed;
}