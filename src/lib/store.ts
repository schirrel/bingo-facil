import { configureStore } from '@reduxjs/toolkit'
import { itemGroupReducer } from './features/item-group/itemGroupSlice'
import { itemReducer } from './features/item-group/itemsSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            itemGroup: itemGroupReducer,
            items: itemReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']