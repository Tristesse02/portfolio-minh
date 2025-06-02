import React from "react";
import { ContentItem } from "@/types";

interface Props {
  content: ContentItem;
}

export default function DescriptionPanel({ content }: Props) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-100 rounded-md">
        <h3 className="font-bold text-lg mb-2">
          Full Description of the projects/work experiences goes here!
        </h3>
        <p className="text-gray-700 mb-4">{content.description}</p>
        <p className="text-gray-600">Lorem Ipsum</p>
      </div>
      <div className="p-4 bg-white rounded-md shadow">
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="font-bold text-lg">{content.likes}</div>
            <div className="text-sm text-gray-600">likes</div>
          </div>
          <div>
            <div className="font-bold text-lg">{content.comments}</div>
            <div className="text-sm text-gray-600">replays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
