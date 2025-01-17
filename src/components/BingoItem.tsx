"use client";
import { setItemCalled } from "@/firebase/bingo-item/update";
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
    const newValue = !item.called;
    setItemCalled(bingoId, item.id, newValue);
    setCalled(newValue);
  };

  return (
    <div
      onClick={itemCalled}
      className={`flex py-8 rounded-lg border-solid border-2 text-center items-center hover:text-gray-800h-full p-2 flex-col w-full ${
        isCalled
          ? "bg-lime-300 text-gray-800 font-bold"
          : "bg-gray-800 text-white "
      } ${!viewMode ? 'cursor-pointer hover:bg-orange-500 ': ''}`}
    >
      {item.value}
    </div>
  );
}
