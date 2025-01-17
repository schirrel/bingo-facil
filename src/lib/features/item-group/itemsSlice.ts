import { ItemModel } from '@/models/Item';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

export interface ItemState {
    items: ItemModel[];
}

const initialState: ItemState = {
    items: [],
};

const itemSlice = createSlice({
    name: 'Item',
    initialState,
    reducers: {
        setItemState: (state, action: PayloadAction<ItemModel[]>) => {
            state.items = action.payload;
        }
    }
})


export const { setItemState } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
