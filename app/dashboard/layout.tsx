import { headers } from "next/headers"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <SidebarInset>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
