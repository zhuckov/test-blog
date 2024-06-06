import { useAuth } from "../../context/AuthContext";
import "./post-page.css";

const PostsPage = ({}) => {
  const { userLogin } = useAuth();
  return (
    <div className="post-page__container">
      <h1 className="post-page__title">Посты на сайте:</h1>
      <div className="post-page__inner">
        <img className="post-page__image" src="/posts.jpg" aria-label="post page" alt="post page image" />
      </div>
    </div>
  );
};

export default PostsPage;
