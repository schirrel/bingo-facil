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

    if (pms.length) {
      Promise.all(pms)
        .then(() => {
          setValue("");
          setText("");
          router.refresh();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="min-w-0 gap-x-4 w-full p-4">
        <div className="flex flex-col min-w-0 gap-x-4 w-full">
          <div className="w-full lg:w-5/6	">
            <label
              htmlFor="item"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Item <small>(Números, palavras ou frase)</small>
            </label>
            <div className="mt-2">
              <div className="">
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                <br />

                <small>
                  Para inserir mais de um item, separe os items utilizando
                  ponto-e-virgula (<strong>;</strong>)
                </small>
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
      </div>
    </>
  );
}
