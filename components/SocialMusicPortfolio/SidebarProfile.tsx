import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share } from "lucide-react";
import React from "react";
import styles from "../../styles/SocialMusicPortfolio/SidebarProfile.module.css";

export default function SidebarProfile() {
  return (
    <div className={styles.sidebar}>
      <Avatar className={styles.avatar}>
        <AvatarImage src="/placeholder.svg?height=80&width=80" />
        <AvatarFallback>MV</AvatarFallback>
      </Avatar>
      <h3 className={styles.name}>Minh Vu</h3>
      <p className={styles.role}>Full Stack Developer</p>
      <div className={styles.actions}>
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
