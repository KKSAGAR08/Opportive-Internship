import React, { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userMessage } from "../../store/userMessage";
import { Button } from "@/components/ui/button";
import Skeleton1 from "../../components/ui/skeletonUser";
import { useAuthStore } from "../../store/userAuthStore";

function SidebarContent() {
  const { users, isUserLoading, selectedUser, getUsers, setSelectedUser} =
    userMessage();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  


  const createFallback = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    const initials =
      words.length >= 2 ? words[0][0] + words[1][0] : words[0][0];

    return initials.toUpperCase();
  };

  

  return (
    <div className="flex flex-col overflow-y-auto">
      {isUserLoading ? (
        <Skeleton1 />
      ) : (
        users.map((user) => (
          <Card
            className={`border-none rounded-none py-4 px-4 cursor-pointer hover:bg-gray-200 ${
              selectedUser?._id === user._id ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div>
              <div className="flex items-center space-x-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="border-2 border-white w-12 h-12">
                    <AvatarImage src="https://gi" />
                    <AvatarFallback>{createFallback(user.name)}</AvatarFallback>
                  </Avatar>
                  {onlineUsers.includes(user._id) && (
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base capitalize">
                      {user.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate pr-2">
                    {onlineUsers.includes(user._id)?"online":"offline"}
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default SidebarContent;
