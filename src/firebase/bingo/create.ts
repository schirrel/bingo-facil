"use client";
import addData from "../database/addData";

export const createNewBingo = async (name: string, user: any) => {
  console.log(user);
  const { result, error } = await addData("bingo", {name});
  return { result, error };
};
