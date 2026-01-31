import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div>
      {session?.user?.email}
      <h1>Dashboard</h1>

      <form
        action={async () => {
          "use server"
          await auth.api.signOut({
            headers: await headers(),
          })

          redirect("/sign-in")
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}
