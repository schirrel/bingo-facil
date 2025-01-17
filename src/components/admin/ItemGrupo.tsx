"use client";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { createItemGroup } from "@/firebase/item-group/create";
import { getItemsGroup } from "@/firebase/item-group/read";
import { deleteItemGroup } from "@/firebase/item-group/delete";
import { ItemGroupModel } from "@/models/ItemGroup";
import { useAppDispatch, useAppStore } from "@/lib/hooks";
import { setItemGroupState } from "@/lib/features/item-group/itemGroupSlice";

export default function ItemGrupo({ bingoId }: { bingoId: string }) {

    const store = useAppStore();
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<ItemGroupModel[]>([]);
    const [groupName, setGorupName] = useState("");
    const [groupQuantity, setGroupQuantity] = useState("");
    const dispatch = useAppDispatch()

    useEffect(() => {
        loadGrupos();
    }, []);

    const loadGrupos = async () => {
        setLoading(true);
        const itemsResponse = await getItemsGroup<ItemGroupModel>(bingoId);
        if (itemsResponse?.result) {
            updateGroupsList(itemsResponse.result);
        }
        setLoading(false);
    }

    const updateGroupsList = (data: ItemGroupModel[]) => {
        setGroups(data);
        dispatch(setItemGroupState(data))
    }

    const addItem = async () => {
        if (groups.find(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase())) {
            alert('Grupo com mesmo nome já existe');
            return;
        }

        if (loading) return;
        setLoading(true);
        const newGroup = {
            name: groupName,
            quantity: groupQuantity ? parseInt(groupQuantity) : 0
        };
        const result = await createItemGroup(bingoId, newGroup);
        if (result.error) {
            console.error(result.error);
            return alert("Ocorreu um problema ao criar grupo.");
        }
        if (result.result) {
            updateGroupsList([...groups, newGroup]);
            setGorupName('');
            setGroupQuantity('');
        }
        setLoading(false);
    };
    const removeGroup = async (group: ItemGroupModel) => {
        if (group.id) {
            const response = await deleteItemGroup(bingoId, group.id);

            if (response.error) {
                console.error(response.error);
                return alert("Ocorreu um problema ao excluir grupo.")
            }
            if (response.result) {
                setGroups(groups.filter(g => g.name !== group.name));
            }

        } else {
            setGroups(groups.filter(g => g.name !== group.name));
        }
    }

    return (
        <>
            {loading ? <Loading /> : <></>}
            <div className="min-w-0 gap-x-4 w-full p-4">
                <div className="flex flex-col min-w-0 gap-x-4 w-full">
                    <div className="w-full lg:w-5/6	">
                        <div>
                            <label
                                htmlFor="item"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Nome do Grupo
                            </label>
                            <div className="mt-2">
                                <div className="">
                                    <input
                                        onChange={(e) => setGorupName(e.target.value)}
                                        value={groupName}
                                        className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>

                        </div>
                        <div>
                            <label
                                htmlFor="item"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Quantidade por cartela
                            </label>
                            <div className="mt-2">
                                <div className="">
                                    <input
                                        type="number"
                                        onChange={(e) => setGroupQuantity(e.target.value)}
                                        value={groupQuantity}
                                        className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <small>Para não limitar deixe vázio ou use 0.</small>

                        </div>
                    </div>

                    <div className="items-end content-end self-end ml-auto">
                        <button
                            disabled={loading}
                            type="button"
                            onClick={addItem}
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
                        >
                            Adicionar Grupo
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <ul role="list" className="m-10 divide-y divide-gray-100">
                        {groups.map((group) => {
                            return <li key={group.id || group.name} className="flex justify-between">
                                <div>
                                    {group.name}  {group.quantity ? `- ${group.quantity} por cartela` : ''}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeGroup(group)}
                                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-xs h-8 px-2"
                                >
                                    Remover
                                </button>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
