import { sleep } from "@/lib/utils"

export default async function Page() {
  await sleep(1000)
  return <div>Workflow</div>
}
