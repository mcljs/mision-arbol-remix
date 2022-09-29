import { prisma } from "~/db.server";

export async function getBookListings() {
  return prisma.book.findMany({});
}

export async function getBooks() {
  return prisma.book.findMany();
}

export async function getBook(slug) {
  return prisma.book.findUnique({ where: { slug } });
}

export async function createBook(book) {
  return prisma.book.create({ data: book });
}

export async function updateBook(slug, book) {
  return prisma.book.update({ data: book, where: { slug } });
}

export async function deleteBook(slug) {
  return prisma.book.delete({ where: { slug } });
}
