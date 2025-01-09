"use client";
import addData from "../database/addData";

export const createNewBingo = async (name: string) => {
  const { result, error } = await addData("bingo", {name});
  return { result, error };
};
