"use client";
import { deleteDataCollection } from "../database/deleteData";

export const deleteCartelaItem = async (doc: string, id: string) => {
  const { result, error } = await deleteDataCollection(
    "bingo",
    doc,
    "items",
    id
  );

  return { result, error };
};
