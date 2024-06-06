import { useEffect, useState } from "react";
import { deletePost, getPostByUserLogin } from "../../services/post";
import { useAuth } from "../../context/AuthContext";
import "./myposts.css";

interface IPost {
  id: number;
  title: string;
  author_login: string;
  content: string;
  created_at: string;
}

const MyPostsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
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

  const removeHandler = (id: number) => {
    const removePostData = new FormData();
    removePostData.append("id", id.toString());
    deletePost(removePostData);
    setPosts(posts.filter((post) => post.id != id));
  };
  return posts && posts.length ? (
    <section className="post-catalog">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <div className="post-info">
            <div className="about-post">
              <p className="info-text">
                <span>Автор:</span>{" "}
                {post.author_login && post.author_login.length > 1
                  ? post.author_login.slice(0, 1).toUpperCase() + post.author_login.slice(1, post.author_login.length)
                  : post.author_login}
              </p>
              <p className="info-text">
                <span>Дата поста:</span> {post.created_at}
              </p>
            </div>
          </div>
          <h2>{post.title}</h2>
          <p className="content-text">{post.content}</p>

          <div className="post-buttons">
            <button
              onClick={() => {
                removeHandler(post.id);
              }}
            >
              Удалить
            </button>
            <button>Редактировать</button>
          </div>
        </div>
      ))}
    </section>
  ) : (
    <p className="not-post">У вас еще нету постов.</p>
  );
};

export default MyPostsPage;
