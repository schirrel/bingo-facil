"use client";
import addData from "../database/addData";

export const createNewBingo = async (name: string, user: any) => {
  const { result, error } = await addData("bingo", {name, user: user.uid});
  return { result, error };
};
