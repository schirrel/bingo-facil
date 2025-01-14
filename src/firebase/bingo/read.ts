import getData, {
  getDataCollection,
  getDataQuery,
  getRealTimeDataCollection,
} from "../database/getData";
export const getBingo = async (id: string) => {
  const { result, error } = await getData("bingo", id);
  return { result, error };
};

export const getBingos = async (id: string) => {
  const { result, error } = await getDataQuery("bingo", {
    field: "user",
    type: "==",
    value: id,
  });
  return { result, error };
};

export const getBingoItems = async (id: string) => {
  const { result, error } = await getDataCollection("bingo", id, "items");
  return { result, error };
};

export const getBingoItemsRealTime = (id: string, callback: () => void) => {
  if (!id) return;
  return getRealTimeDataCollection(
    { colllection: "bingo", id, innerCollection: "items" },
    callback
  );
};
