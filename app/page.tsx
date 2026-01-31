import Link from "next/link"
import { ComponentExample } from "@/components/component-example"

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/dashboard">Dashboard</Link>
      <ComponentExample />
    </div>
  )
}
