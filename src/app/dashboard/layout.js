import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <div className="w-full flex items-center justify-between h-10 bg-white shadow px-5">
                <SidebarTrigger />
              </div>
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
