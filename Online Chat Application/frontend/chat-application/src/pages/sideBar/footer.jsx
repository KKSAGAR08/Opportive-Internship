import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userMessage } from "../../store/userMessage";

function Footer() {
  const [textMsg, setTextMsg] = useState("");
  const { sendMessage } = userMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textMsg.trim()) return;
    try {
      const res = await sendMessage(textMsg);

      setTextMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Separator />
      <div className="p-3 sm:p-4 ">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6 items-center">
            <Input
              className="flex-1 border border-gray-400"
              placeholder="Type a message..."
              value={textMsg}
              onChange={(e) => setTextMsg(e.target.value)}
            />
            <div>
              <Button
                className="bg-green-300 hover:bg-green-500 cursor-pointer rounded-full"
                disabled={!textMsg?.trim()}
              >
                <Send />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Footer;
