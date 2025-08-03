import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {SidebarTrigger} from "@/components/ui/sidebar"
import { Phone, Search, Video, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { userMessage } from "../../store/userMessage";
import { useAuthStore } from "../../store/userAuthStore";
import toast from "react-hot-toast";

function Navbar() {
  const { users, isUserLoading, selectedUser, setSelectedUser, messages } =
    userMessage();

  const { onlineUsers } = useAuthStore();

  const [searchText, setSearchText] = useState("");
  const [searchButton, setSearchButton] = useState(true);

  const createFallback = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    const initials =
      words.length >= 2 ? words[0][0] + words[1][0] : words[0][0];

    return initials.toUpperCase();
  };

  const normalDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handletext = (e) => {
    e.preventDefault();

    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return;

    const matches = messages.filter((msg) =>
      msg.text.toLowerCase().includes(keyword)
    );

    if (matches.length > 0) {
      const recentMatch = matches[matches.length - 1];

      const time = normalDate(recentMatch.createdAt);

      toast.success("The message found at time\n" + time, {
        duration: 6000,
      });
    } else {
      toast.error("No message found");
    }

    setSearchText("");
    setSearchButton(true); // Hide search bar after submit
  };

  return (
    <>
      <div className=" flex justify-between p-3 sm:p-4">
        <div className="flex space-x-3">
          <Avatar className="border-2 border-white w-12 h-12">
            <AvatarImage src="https://gi" />
            <AvatarFallback className="font-semibold">
              {createFallback(selectedUser.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base capitalize">
              {selectedUser.name}
            </h3>
            <span className={`text-xs  flex-shrink-0 ${onlineUsers.includes(selectedUser._id)?'text-green-400':'text-red-400'}`}>
              {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {searchButton ? (
            <>
              <SidebarTrigger/>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setSearchButton(false)}
              >
                <Search />
              </Button>
            </>
          ) : (
            <>
              <form className="flex space-x-3" onSubmit={handletext}>
                <input
                  type="text"
                  placeholder="Search here"
                  className="input input-sm bg-transparent border border-black"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {!searchText ? (
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setSearchButton(true)}
                  >
                    <X />
                  </Button>
                ) : (
                  <Button variant="outline" className="cursor-pointer">
                    <Search />
                  </Button>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}

export default Navbar;
