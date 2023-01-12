import { prisma } from "../db.server";

export async function getPostListings() {
  return prisma.post.findMany({});
}

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(post) {
  return prisma.post.create({ data: post });
}

export async function updatePost(slug, post) {
  return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug) {
  return prisma.post.delete({ where: { slug } });
}
