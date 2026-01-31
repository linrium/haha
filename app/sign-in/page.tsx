"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function Page() {
  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email: "linrium@gmail.com", // user email address
      password: "123456789", // user password -> min 8 characters by default
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    })

    console.log(data)
    if (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  )
}
