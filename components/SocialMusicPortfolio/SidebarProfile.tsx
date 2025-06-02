import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share } from "lucide-react";
import React from "react";

export default function SidebarProfile() {
  return (
    <div className="p-4 text-center">
      <Avatar className="w-20 h-20 mx-auto mb-3">
        <AvatarImage src="/placeholder.svg?height=80&width=80" />
        <AvatarFallback>MV</AvatarFallback>
      </Avatar>
      <h3 className="font-semibold">Minh Vu</h3>
      <p className="text-sm text-gray-600">Full Stack Developer</p>
      <div className="flex justify-center gap-4 mt-4">
        {/* Social buttons omitted for brevity */}
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
