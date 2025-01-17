"use client";
import React, { useState } from "react";
import { ItemModel } from "@/models/Item";
import { useSelector } from "react-redux";
import { ItemGroupModel } from "@/models/ItemGroup";
import { RootState } from "@/lib/store";

export default function ItemCartela({ item }: {
    item: ItemModel
}) {
    const groups = useSelector((state: RootState) => state.itemGroup.groups);
    const setItemGroup = (value: string) => {
        item.group = value;
    }
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                        {item.value}
                    </p>
                </div>
            </div>
            <div className="flex w-52">
                <div className="items-end content-end self-end ml-auto">
                    <select name="groupItem" id="groupItem"
                        onChange={(e) => setItemGroup(e.target.value)}>
                        <option value="">Selecione Grupo</option>
                        {groups.map((group: ItemGroupModel) => {
                            return (<option key={group.name} value={group.name}>{group.name}</option>)
                        })}
                    </select>
                </div>
            </div>
        </li>
    );
}
