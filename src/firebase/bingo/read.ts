import getData from "../database/getData";

export const getBingo = async (id: string) => {
  const { result, error } = await getData("bingo", id);
  return { result, error };
};