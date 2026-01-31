"use client"

import { startTransition, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { createPost } from "@/lib/actions/posts"

export default function CreatePostForm() {
  const [, action, pending] = useActionState(createPost, undefined)

  return (
    <Button onClick={() => startTransition(action)} disabled={pending}>
      {pending && <Spinner data-icon="inline-start" />}
      {pending ? "Inserting" : "Insert"}
    </Button>
  )
}
