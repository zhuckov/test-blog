import { useEffect, useState } from "react";
import { getPosts } from "../../services/post";
const MyPostsPage = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ limit, page });
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [page, limit]);
  return (
    <section className="post-catalog">
      {posts &&
        posts.map((post) => (
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
          </div>
        ))}
    </section>
  );
};

export default MyPostsPage;
