"use client";
import { getDataCollectionItem } from "../database/getData";
import { updateDataCollection } from "../database/updateData";

export const setItemCalled = async (idBingo: string, idItem: string, value: boolean) => {
  const response = await getDataCollectionItem(
    "bingo",
    idBingo,
    "items",
    idItem
  );

  if (!response.result) return;

  response.result.called = value;
  const { result, error } = await updateDataCollection(
    "bingo",
    idBingo,
    "items",
    idItem,
    response.result
  );

  return { result, error };
};
