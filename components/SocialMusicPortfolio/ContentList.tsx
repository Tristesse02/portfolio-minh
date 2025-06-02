import React from "react";
import { ContentItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";

interface Props {
  items: ContentItem[];
  currentId: string;
  onSelect: (item: ContentItem) => void;
}

export default function ContentList({ items, currentId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            currentId === item.id ? "ring-2 ring-purple-500" : ""
          }`}
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span className="font-medium">{item.title}</span>
            <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {item.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {item.comments}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
