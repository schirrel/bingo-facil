"use client";
import React, { useState } from "react";

export default function BingoItem({ item }) {
  const [isCalled, setCalled] = useState(false);

  const itemCalled = () => {
    setCalled(true);
  };

  if(item.called) {
    itemCalled();
  }

  return (
    <div
      onClick={itemCalled}
      className={`flex py-8 rounded-lg border-solid border-2 text-center items-center hover:text-gray-800 text-white h-full p-2 flex-col w-full cursor-pointer ${
        isCalled ? "bg-lime-300 text-gray-800" : " hover:bg-orange-300 hover:text-gray-800 hover:text-gray-800 bg-gray-800 "
      }`}
    >
      {item.value} - {isCalled}
    </div>
  );
}
