"use client";
import { getDataCollectionItem } from "../database/getData";
import { updateDataCollection } from "../database/updateData";

export const setItemCalled = async (idBingo: string, idItem: string) => {
  const response = await getDataCollectionItem(
    "bingo",
    idBingo,
    "items",
    idItem
  );

  if (!response.result) return;

  response.result.called = true;
  const { result, error } = await updateDataCollection(
    "bingo",
    idBingo,
    "items",
    idItem,
    response.result
  );

  return { result, error };
};
