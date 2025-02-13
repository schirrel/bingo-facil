"use client";
import { deleteDataCollection } from "../database/deleteData";

export const deleteCartela= async (doc: string, id: string) => {
  const { result, error } = await deleteDataCollection(
    "bingo",
    doc,
    "cartelas",
    id
  );

  return { result, error };
};
