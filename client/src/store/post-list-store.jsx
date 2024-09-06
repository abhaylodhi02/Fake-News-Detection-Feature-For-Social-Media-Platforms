import {createContext} from "react";
import PropTypes from 'prop-types';
import { useReducer } from "react";



export const PostList = createContext({
    postList : [],
    addPost: () => {},
    addInitialPosts: () =>{},
    deletePost: () => {
    }
});

const postListReducer = (currPostList, action) =>{
    let newPostList = currPostList;

    if(action.type === 'DELETE_POST'){
        newPostList = currPostList.filter((post) => action.payload.postId !== post.id)
    }else if(action.type === 'ADD_INITIAL_POSTS'){
        newPostList = action.payload.posts;
    }
    else if(action.type === 'ADD_POST'){
        newPostList = [action.payload,...currPostList];
    }
    return newPostList;
};

const PostListProvider = ({children}) =>{
    

    const [postList, dispatchPostList] = useReducer(postListReducer,[]/*DEFAULT_POST_LIST*/);

    const addPost = (post) => {
        dispatchPostList({
            type : 'ADD_POST',
            payload: post,

        })
    }
    const addInitialPosts = (posts) => {
        dispatchPostList({
            type : 'ADD_INITIAL_POSTS',
            payload: {
                posts,
            },
        })
    }

    const deletePost = (postId) => {
        dispatchPostList({
            type : 'DELETE_POST',
            payload: {
                postId,
            },
        })
    }

    return (<PostList.Provider value= {{
        postList, // objects
        addPost,
        addInitialPosts,
        deletePost,
    }}>{children}</PostList.Provider>
   );
}


PostListProvider.propTypes = {
    children: PropTypes.object.isRequired,
    
}

// const DEFAULT_POST_LIST = [
//     {
//     id : "1",
//     title : "Going to dholakpur",
//     body : "Hi friends, I am going to dholakpur",
//     reactions: 2,
//     userId: "user69",
//     tags: ["vacation", "dholakpur"],
//    },
//    {
//     id : "2",
//     title : "Kamla bhai",
//     body : "Kamla jHukega ni !!",
//     reactions: 10,
//     userId: "user669",
//     tags: ["kamla", "paanMasala"],
//    }
// ];


export default PostListProvider;

