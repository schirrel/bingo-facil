"use client";

import AdminHeader from "@/components/admin/header";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getBingos } from "@/firebase/bingo/read";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/admin/loading";
import { BingoModel } from "@/models/Bingo";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<BingoModel[]>([]);
  if (!user) {
    router.push("/");
  }

  const loadItems = async () => {
    setLoading(true);

    const itemsResult = await getBingos((user as any).uid || "");
    const converted: BingoModel[] =
      itemsResult.result?.map((itm) => itm as unknown as BingoModel) || [];
    setItems(converted);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="min-h-full">
      <AdminHeader />
      {loading ? <Loading /> : <></>}
      <ul role="list" className="m-10 divide-y divide-gray-100">
        {items.map((item) => {
          return (
            <li className="flex justify-between gap-x-6 py-5" key={item.id}>
              <div className="flex min-w-0 gap-x-4"> {item.name} </div>
              <div className="flex w-52">
                <div className="items-end content-end self-end ml-auto">
                  <Link
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
                    href={`/admin/bingos/${item.id}`}
                  >
                    Acessar
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
