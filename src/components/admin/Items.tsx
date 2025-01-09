"use client";
import React from "react";
import { createCartelaItem } from "@/firebase/cartela/create";
export default function Item({ id, onSave }: { id: string, onSave: void }) {
  const saveItem = (event: any) => {
    createCartelaItem(id, event.target.value);
  };

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4 w-full">
        <div className="w-5/6	">
          <label
            htmlFor="item"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Item da cartela
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                Numero, Palavra, frase
              </div>
              <input
                type="text"
                name="item"
                id="item"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="items-end content-end self-end ml-auto">
          <button
            onClick={saveItem}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
          >
            Salvar
          </button>
        </div>
      </div>
    </li>
  );
}
