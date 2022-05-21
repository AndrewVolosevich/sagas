import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";

export const fetchPosts = createAsyncThunk<any[], undefined, { rejectValue: string }>(
    'posts/fetchPosts',
    async (thunkAPI, {rejectWithValue}) => {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await resp.json()
            return data
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)
export interface PostsSlice {
    posts: any[],
    loading: boolean,
    error: string | undefined
}
const initialState: PostsSlice = {
    posts: [],
    loading: false,
    error: ''
}
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setData: (state, action: PayloadAction<any[]>) => {
            state.posts = action.payload
        },
    },
    extraReducers: {
        [fetchPosts.fulfilled.type]: (state, action) => {
            state.posts = action.payload
            state.loading = false
        },
        [fetchPosts.pending.type]: (state, action) => {
            state.loading = true
        },
        [fetchPosts.rejected.type]: (state, action) => {
            state.loading = false
            if (action.payload) {
                state.error = action?.payload
            } else {
                state.error = action.error.message
            }
        },
    }
    // extraReducers: (builder) => {
    //     builder.addCase(fetchPosts.fulfilled, (state, action) => {
    //         state.posts = action.payload
    //         state.loading = false
    //     })
    //     builder.addCase(fetchPosts.pending, (state, action) => {
    //         state.loading = true
    //     })
    //     builder.addCase(fetchPosts.rejected, (state, action) => {
    //         state.loading = false
    //         console.log(action)
    //         if (action.payload) {
    //             state.error = action?.payload
    //         } else {
    //             state.error = action.error.message
    //         }
    //     })
    // },
})
export const { setLoading, setError, setData } = postsSlice.actions
export const postsReducer = postsSlice.reducer

export const getPostsOperation = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        dispatch(setData(data))
    } catch (e: any) {
        dispatch(setError(e.message as string))
    }
    dispatch(setLoading(false))
}
