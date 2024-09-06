import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store";

const Post = (prop) => {
  const { deletePost } = useContext(PostList);
  const { post } = prop;

  // Provide default values if properties are undefined
  const tags = post.tags || []; // Default to empty array if tags is undefined
  const { title, body, reactions } = post;
  const { likes = 0, dislikes = 0 } = reactions || {}; // Default to 0 if reactions is undefined
  // console.log(title)
  // console.log(body)
  // console.log(reactions)
  // console.log(tags)

  return (
    <div className="card post-card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{body}</p>
        {tags.map(tag => (
          <span className="badge text-bg-primary hashtag" key={tag}>
            {tag}
          </span>
        ))}
        <div className="alert alert-success reaction" role="alert">
          {likes} people liked this post!<br />
          {dislikes} people disliked this post!
        </div>
      </div>
    </div>
  );
};

export default Post;
