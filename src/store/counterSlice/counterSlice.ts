import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface CounterState {
    count: number
}

const initialState: CounterState = {
    count: 42,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload
        },
    },
})

export const selectCount = (state: RootState) => state.counter.count
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const counterReducer = counterSlice.reducer