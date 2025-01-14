"use client";
import { setItemCalled } from "@/firebase/cartela/update";
import React, { useState } from "react";

export default function BingoItem({
  item,
  bingoId,
  viewMode,
}: {
  item: any;
  bingoId: string;
  viewMode?: boolean;
}) {
  const [isCalled, setCalled] = useState(item.called);

  const itemCalled = () => {
    if (viewMode) return;
    setItemCalled(bingoId, item.id);
    setCalled(true);
  };

  return (
    <div
      onClick={itemCalled}
      className={`flex py-8 rounded-lg border-solid border-2 text-center items-center hover:text-gray-800h-full p-2 flex-col w-full ${
        isCalled
          ? "bg-lime-300 text-gray-800 text-gray-800 font-bold"
          : viewMode
          ? "bg-gray-800 text-white"
          : "cursor-pointer hover:bg-orange-300 hover:text-gray-800 hover:text-gray-800 bg-gray-800 text-white"
      }`}
    >
      {item.value}
    </div>
  );
}
