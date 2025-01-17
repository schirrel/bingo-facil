"use client";
import { useParams } from 'next/navigation'

import AdminHeader from "@/components/admin/header";
import { getBingoItems } from "@/firebase/bingo/read";
import { useEffect, useState } from 'react';
import { ItemModel } from '@/models/Item';
import ItemGrupo from '@/components/admin/ItemGrupo';
import ItemCartela from '@/components/admin/ItemsCartela';
import StoreProvider from '@/app/StoreProvider';

export default function Page() {
    const params = useParams()
    const id = params.id as string;
    const [items, setItems] = useState<ItemModel[]>([]);

    useEffect(() => {
        loadItems();
    })


    const loadItems = async () => {
        const itemsResponse = await getBingoItems<ItemModel>(id);
        if (itemsResponse?.result) {
            setItems(itemsResponse.result);
        }
    }

    const saveItems = () => {
        console.log(items);
    }

    return (
        <div className="min-h-full">
            <AdminHeader />
            <StoreProvider>
                <div className="grid grid-cols-1 p-2 md:grid-cols-3 gap-4 place-content-center">
                    <div>

                        <div className="flex gap-2">
                            <ItemGrupo bingoId={id} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <ul role="list" className="m-10 divide-y divide-gray-100">
                            {items.map((item) => {
                                return <ItemCartela key={item.id} item={item} bingoId={id} />;
                            })}
                        </ul>
                        <button
                            onClick={saveItems}
                            type="button"
                            className="rounded-full ml-auto mr-6 border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-xs h-8 px-2"
                        >
                            Salvar Grupos
                        </button>

                    </div>
                </div>
            </StoreProvider>
        </div>
    );
}
