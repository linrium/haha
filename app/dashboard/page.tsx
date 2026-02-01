import { Suspense } from "react"
import { getPosts } from "@/lib/actions/posts"
import CreatePostForm from "./_components/create-post-form"
import Posts from "./_components/posts"

export default async function Page() {
  const posts = getPosts()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts posts={posts} />
      </Suspense>

      <CreatePostForm />
    </div>
  )
}
