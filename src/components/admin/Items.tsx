"use client";
import React, { useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { deleteCartelaItem } from "@/firebase/bingo-item/delete";

export default function Item({ item, bingoId }: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteItem = async () => {
    setLoading(true);
    await deleteCartelaItem(bingoId, item.id);
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      <li  className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              {item.value}
            </p>
          </div>
        </div>
        <div className="flex w-52">
          <div className="items-end content-end self-end ml-auto">
            <button
              onClick={deleteItem}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
            >
              Apagar
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
