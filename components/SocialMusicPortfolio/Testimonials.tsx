import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/types";
import React from "react";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <div className="space-y-3">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-gray-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={t.avatar} />
              <AvatarFallback>{t.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-gray-600">
                {t.role} {t.company}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
