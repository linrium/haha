"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function Page() {
  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email: "linrium@gmail.com", // user email address
      password: "123456789", // user password -> min 8 characters by default
      name: "Linh Tran", // user display name
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    })

    console.log(data)
    if (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  )
}
