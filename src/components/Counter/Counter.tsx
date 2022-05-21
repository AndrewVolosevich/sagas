import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {
    decrement,
    increment,
    selectCount
} from "../../store/counterSlice/counterSlice";

const Counter = () => {
    // const {count} = useAppSelector(state => state.counter)
    const count = useAppSelector(selectCount)
    const dispatch = useAppDispatch()

    return (
        <div>
            Counter: {count}

            <br />

            <button onClick={() => dispatch(increment())}>PLUS 1</button>
            <button onClick={() => dispatch(decrement())}>MINUS 1</button>
        </div>
    );
};

export default Counter;