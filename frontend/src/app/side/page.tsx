"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashPage from "../dash/page"


export default function Side() {

  return (
    <>
      <SidebarProvider  >


        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <SidebarTrigger />
        <div className="w-full">
          <DashPage/>
        </div>
      </SidebarProvider>
      
    </>
  )
}