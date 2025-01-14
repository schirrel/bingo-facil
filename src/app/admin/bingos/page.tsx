"use client";

import AdminHeader from "@/components/admin/header";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getBingos } from "@/firebase/bingo/read";
import { useEffect, useState } from "react";
import { ItemModel } from "@/models/Item";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [items, setItems] = useState<ItemModel[]>([]);
  if (!user) {
    router.push("/");
  } else {
  }

  const loadItems = async () => {
    const itemsResult = await getBingos((user as any).uid || "");
    const converted: ItemModel[] =
      itemsResult.result?.map((itm) => itm as unknown as ItemModel) || [];
    setItems(converted);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="min-h-full">
      <AdminHeader />
      <div className="grid grid-cols-3 gap-4 place-content-center">
        <div className="col-span-2">
          <ul role="list" className="m-10 divide-y divide-gray-100">
            {items.map((item) => {
              return <span key={item.value}> {item.value} </span>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
