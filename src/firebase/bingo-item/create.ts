"use client";
import { addDataCollection } from "../database/addData";

export const createCartelaItem = async (id: string, value: string) => {
  const { result, error } = await addDataCollection("bingo", id, "items", {
    value,
  });

  return { result, error };
};
