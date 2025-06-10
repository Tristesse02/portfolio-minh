import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/types";
import React from "react";
import styles from "../../styles/SocialMusicPortfolio/Testimonials.module.css";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <div className={styles.testimonialsWrapper}>
      {testimonials.map((t, i) => (
        <div key={i} className={styles.testimonialCard}>
          <div className={styles.header}>
            <Avatar style={{ width: "2rem", height: "2rem" }}>
              {/* <AvatarImage src={t.avatar} /> */}
              {/* TODO: make user add their own avatar later  */}
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback style={{ backgroundColor: "#dcdddf" }}>
                {t.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className={styles.name}>{t.name}</div>
              <div className={styles.role}>
                {t.role} @{t.company}
              </div>
            </div>
          </div>
          <p className={styles.message}>{t.message}</p>
        </div>
      ))}
    </div>
  );
}
