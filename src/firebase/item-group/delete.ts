"use client";
import { deleteDataCollection } from "../database/deleteData";

export const deleteItemGroup = async (doc: string, id: string) => {
  const { result, error } = await deleteDataCollection(
    "bingo",
    doc,
    "grupos",
    id
  );

  return { result, error };
};
