import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {fetchPosts, getPostsOperation} from "../../store/posts/postsSlice";

const Posts = () => {
    const dispatch = useAppDispatch()
    const {posts, loading, error} = useAppSelector(state => state.posts)

    return (
        <div>
            Posts

            <br />
            <button onClick={() => dispatch(getPostsOperation())}>Get posts</button>
            <button onClick={() => dispatch(fetchPosts())}>Get posts 2</button>

            {loading && <h3>Loading...</h3>}
            {error && <h3>{error}</h3>}
            {!error && !!posts?.length &&<div>{posts?.map(post =>  {
                return <h4>{post.title}</h4>
            })}</div>}
        </div>
    );
};

export default Posts;