"use client";
import { ItemGroupModel } from "@/models/ItemGroup";
import { addDataCollection } from "../database/addData";

export const createItemGroup = async (id: string, value: ItemGroupModel) => {
    const { result, error } = await addDataCollection("bingo", id, "grupos", value);

    return { result, error };
};
