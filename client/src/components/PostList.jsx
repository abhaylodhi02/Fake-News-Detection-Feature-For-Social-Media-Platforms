import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
   const { postList, addInitialPosts } = useContext(PostListData);
   const [fetching, setFetching] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Only fetch data if postList is empty
      if (postList.length === 0) {
         const controller = new AbortController();
         const signal = controller.signal;

         setFetching(true);

         fetch('https://dummyjson.com/posts', { signal })
            .then((res) => {
               if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
               }
               return res.json();
            })
            .then((data) => {
               if (!signal.aborted) {
                  addInitialPosts(data.posts); // Add posts to the list
                  setFetching(false); // Stop the loading spinner
               }
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("Fetch aborted");
               } else {
                  setError(err.message);
                  setFetching(false);
               }
            });

         return () => {
            controller.abort(); // Abort fetch when unmounting
         };
      }
   }, [postList, addInitialPosts]); // Dependency on postList and addInitialPosts

   return (
      <>
         {fetching && <LoadingSpinner />}
         {error && <p>Error: {error}</p>}
         {!fetching && postList.map((post) => 
            <Post key={post.id} post={post} />
         )}
      </>
   );
};

export default PostList;
