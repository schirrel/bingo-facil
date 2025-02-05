"use client";
import { addDataCollection } from "../database/addData";

type Cartela = {
    numero: number,
    items: string[]
}

export const createCartela = async (id: string, value: Cartela) => {
    const { numero, items } = value;
    const { result, error } = await addDataCollection("bingo", id, "cartelas", {
        numero, items
    });

    return { result, error };
};
