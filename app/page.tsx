import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/dashboard">Dashboard</Link>
      <br />
      <Link href="/sign-in">Sign In</Link>
    </div>
  )
}
