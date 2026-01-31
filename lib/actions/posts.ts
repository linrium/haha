"use server"

import { refresh } from "next/cache"
import { sleep } from "../utils"

const posts = [
  { id: "1", title: "Post 1" },
  { id: "2", title: "Post 2" },
  { id: "3", title: "Post 3" },
]

export async function getPosts() {
  await sleep(1000)
  return posts
}

export async function createPost() {
  await sleep(1000)
  const newPost = { id: Date.now().toString(), title: "New Post" }
  posts.push(newPost)

  refresh()
}
