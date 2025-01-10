"use client";
import React, { useState } from "react";
import { createCartelaItem } from "@/firebase/cartela/create";
import { useRouter } from "next/navigation";
import Loading from "./loading";
export default function NovoItem({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();

  const saveItem = async () => {
    setLoading(true);
    const items = (value || text).split(";");
    const pms: Promise<any>[] = [];
    items.forEach((itemToSave) => {
      if (itemToSave) {
        pms.push(createCartelaItem(id, itemToSave.trim()));
      }
    });

    pms.length &&
      Promise.all(pms)
        .then(() => {
          setValue("");
          setText("");
          router.refresh();
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="min-w-0 gap-x-4 w-full p-4">
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
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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

        <div>
          <label
            htmlFor="item"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Criar em massa
          </label>
          <div className="mt-2">
            <div className="">
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              <br />

              <span>
                Separe os números, palavras ou frase utilizando ponto-e-virgula
                (<strong>;</strong>)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
