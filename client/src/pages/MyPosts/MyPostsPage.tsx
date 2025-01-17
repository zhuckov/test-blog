import { useEffect, useState } from "react";
import { deletePost, getPostByUserLogin } from "../../services/post";
import { useAuth } from "../../context/AuthContext";
import "./myposts.css";
import UserPost from "../../components/userPost/UserPost";
import { Link } from "react-router-dom";

export interface IPostCatalog {
  id: number;
  title: string;
  author_login: string;
  content: string;
  created_at: string;
}

const MyPostsPage = () => {
  const [posts, setPosts] = useState<IPostCatalog[]>([]);

  const { userLogin } = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userLogin != null) {
          const userPostsFormData = new FormData();
          userPostsFormData.append("author_login", userLogin.toString());
          const data = await getPostByUserLogin(userPostsFormData);
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [userLogin]);

  const removeHandler = async (id: number) => {
    try {
      const removePostData = new FormData();
      removePostData.append("id", id.toString());
      await deletePost(removePostData);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <section className="post-catalog">
      {posts && posts.map((post) => <UserPost key={post.id} {...post} removeHandler={removeHandler} />)}
      {!posts.length && (
        <div className="no-posts">
          <p className="no-posts__text">У вас еще нету постов</p>
          <Link to="/create-post" className="no-posts__button">
            Нажмите что бы создать пост
          </Link>
        </div>
      )}
    </section>
  );
};

export default MyPostsPage;
