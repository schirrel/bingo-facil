import { ItemGroupModel } from '@/models/ItemGroup';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

export interface ItemGroupState {
    groups: ItemGroupModel[];
}

const initialState: ItemGroupState = {
    groups: [],
};

const itemGroupSlice = createSlice({
    name: 'ItemGroup',
    initialState,
    reducers: {
        setItemGroupState: (state, action: PayloadAction<ItemGroupModel[]>) => {
            state.groups = action.payload;
        }
    }
})


export const { setItemGroupState } = itemGroupSlice.actions;
export const itemGroupReducer = itemGroupSlice.reducer;
