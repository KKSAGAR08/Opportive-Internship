import { MessageCircle, MessageCircleDashed } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

function nochat() {
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }
  return (
    <>
      <div className="text-center p-3">
        <SidebarTrigger/>
        <span className="text-2xl capitalize text-green-500 font-semibold">
          {getGreeting()}
        </span>
      </div>
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <div className="w-25 h-25 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-15 h-15 text-green-500" />
        </div>
        <span className="font-bold text-xl">
          Welcome to Online Chat Application
        </span>
        <span className="text-muted-foreground">
          Select the conversation from the sidebar to start chatting
        </span>
      </div>
    </>
  );
}

export default nochat;
