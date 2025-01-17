import getData, {
  getDataCollection,
  getDataQuery,
  getRealTimeDataCollection,
} from "../database/getData";
export const getItemsGroup = async <T>(id: string) => {
  const { result, error } = await getDataCollection<T>("bingo", id, "grupos");
  return { result, error };
};
