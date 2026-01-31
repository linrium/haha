import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex items-center gap-2">
      <Spinner data-icon="inline-start" />
      Loading...
    </div>
  )
}
