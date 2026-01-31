import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { createPost, getPosts } from "@/lib/actions/posts"
import { auth } from "@/lib/auth"
import CreatePostForm from "./components/create-post-form"
import Posts from "./components/posts"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const posts = getPosts()

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Dashboard</h1>
      {session?.user?.email}
      <form
        action={async () => {
          "use server"
          await auth.api.signOut({
            headers: await headers(),
          })

          redirect("/sign-in")
        }}
      >
        <Button type="submit" variant="destructive">
          Sign Out
        </Button>
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <Posts posts={posts} />
      </Suspense>

      <CreatePostForm />
    </div>
  )
}
