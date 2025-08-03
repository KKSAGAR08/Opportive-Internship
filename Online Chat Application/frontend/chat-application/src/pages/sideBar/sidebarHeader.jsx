import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, X, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {useAuthStore} from "../../store/userAuthStore"
import toast from "react-hot-toast";
import { userMessage } from "../../store/userMessage";

function SidebarHeaderContent() {
  const {userAuth,logOUT} = useAuthStore();
  const {users} = userMessage();

  const [searchPerson,setSearchPerson] = useState("");

  const search = () => {
  if (!searchPerson.trim()) {
    return toast.error('Enter the Name');
  }

  const found = users.some(user =>
    user.name?.toLowerCase().includes(searchPerson.trim().toLowerCase())
  );

  if (found) {
    return toast.success('User found');
  } else {
    return toast.error('User not found');
  }
};


  const createFallback = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    const initials =
      words.length >= 2 ? words[0][0] + words[1][0] : words[0][0];

    return initials.toUpperCase();
  };
  
  return (
    <div className="p-4 bg-green-500 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-black">
            <Avatar className="border-2 border-white w-10 h-10">
              <AvatarImage src="https://gi" />
              <AvatarFallback>{createFallback(userAuth.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="font-semibold text-white capitalize">{userAuth.name}</h2>
            <p className="text-sm text-green-100">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 border-none">
          <Button
            className="cursor-pointer bg-green-500 border-none hover:bg-green-600 hover:text-green-300 flex items-center shadow-none"
            variant="outline"
            onClick={logOUT}
          >
            <LogOut />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </div>
      </div>
      <div className="relative">
        <Button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-9 h-9 rounded-none cursor-pointer"
        variant="outline"
        onClick={search}
        >
          <Search/>
        </Button>
        <Input
          placeholder="Search contact"
          className="pl-10 bg-white border-0 rounded text-gray-800 placeholder-gray-500"
          value={searchPerson}
          onChange={(e)=>setSearchPerson(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SidebarHeaderContent;
