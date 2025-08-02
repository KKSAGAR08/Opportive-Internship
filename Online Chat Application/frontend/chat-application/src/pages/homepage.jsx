import { React, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarHeaderContent from "./sideBar/sidebarHeader";
import SidebarContent1 from "./sideBar/sidebarContent";
import Navbar from "./sideBar/navbar";
import Footer from "./sideBar/footer";
import Content from "./sideBar/content";
import NoChat from "./sideBar/nochat";
import { userMessage } from "../store/userMessage";

export default function AppSidebar() {
  const { selectedUser } = userMessage();

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderContent /> {/* ✅ correct usage */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarContent1 />
        </SidebarContent>
      </Sidebar>
      <div className="w-screen sm:w-[calc(100vw-20rem)] h-[calc(var(--vh)_*_100)]  flex flex-col">
        {!selectedUser ? (
          <NoChat />
        ) : (
          <>
            <Navbar />
            <div className="flex-1 overflow-y-auto">
              <Content />
            </div>
            <Footer />
          </>
        )}
      </div>
    </SidebarProvider>
  );
}
