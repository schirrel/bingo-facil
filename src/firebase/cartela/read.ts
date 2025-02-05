import {
    getDataCollection,
    getDataCollectionQuery,
} from "../database/getData";

export const getCartela = async (id: string, numero: string) => {
    const { result, error } = await getDataCollectionQuery("bingo", id, "cartelas", {
        field: "numero",
        type: "==",
        value: parseInt(numero),
    });
    if(result.length) {

    }
    return { result, error };
};

export const getCartelas = async (id: string) => {
    const { result, error } = await getDataCollection("bingo", id, "cartelas");
    return { result, error };
};
