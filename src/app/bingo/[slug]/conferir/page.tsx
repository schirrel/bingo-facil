"use client";
import Loading from "@/components/admin/loading";
import BingoItem from "@/components/BingoItem";
import {
  getBingo,
  getBingoItems,
  getBingoItemsRealTime,
} from "@/firebase/bingo/read";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: any }) {
  const [bingoId, setBingoId] = useState("");
  const [bingo, setBingo] = useState({});
  const [items, setItems] = useState<any>([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateItemsList = (data: any[]) => {
    setItems(data || []);
  };

  useEffect(() => {
    params.then((res: { slug: string }) => {
      setBingoId(res.slug);
      loadBingo(res.slug);
    });
  }, []);

  useEffect(() => {
    if (reload) {
      setReload(false);
      reloadList();
    }
  }, [reload]);

  const reloadList = async () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await getBingoItems(bingoId);
      updateItemsList(response.result || []);
      setLoading(false);
    }, 500);
  };

  const loadBingo = async (slug: string) => {
    const bingoRes = await getBingo(bingoId || slug);
    setBingo(bingoRes.result || {});

    const itemsRes = await getBingoItems(bingoId || slug);
    updateItemsList(itemsRes.result || []);
    getBingoItemsRealTime(bingoId || slug, () => {
      setReload(true);
    });
  };

  return (
    <div className="min-h-full">
      {loading ? <Loading /> : <></>}
      <h2 className="p-4 text-3xl font-bold tracking-tight text-gray-900">
        Bingo: {bingo.name}
      </h2>
      <div
        role="list"
        className="grid-cols-3 gap-2 md:m-10 grid md:grid-cols-4 md:gap-4 place-items-center"
      >
        {items &&
          items.map((item) => {
            return (
              <BingoItem
                bingoId={bingoId}
                item={item}
                key={crypto.randomUUID()}
                viewMode={true}
              />
            );
          })}
      </div>
    </div>
  );
}
