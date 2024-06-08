import { ChangeEvent, useEffect, useState } from "react";

import "./post-page.css";
import { getPosts } from "../../services/post";
import Avatar from "../../components/ui/avatar/Avatar";

const PostsPage = ({}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ limit, page });
        setPosts(data.posts);
        const tp = Math.ceil(data.totalPosts / limit);
        setTotalPages(tp);
        setTotalPosts(data.totalPosts);
      } catch (err: any) {
        setError(err?.message);
      }
    };
    fetchPosts();
  }, [page, limit]);
  const handlerLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= totalPosts && parseInt(e.target.value) != 0) {
      setLimit(parseInt(e.target.value));
    }
  };
  return (
    <div className="post-page__container">
      <h2 className="post-page__h2">ContentCrafter</h2>
      <p className="post-page__description">
        ContentCrafter – это инновационная платформа, созданная для творческих людей, стремящихся делиться своими идеями, мыслями и
        историями. В нашем цифровом пространстве каждый может найти своё место и выразить себя, будь то через текст, фото или видео.
        ContentCrafter – это место, где контент становится искусством.
      </p>
      <div className="post-page__inner">
        <img className="post-page__image" src="/posts.jpg" aria-label="post page" alt="post page image" />
      </div>
      <h2 className="post-page__h2">Миссия</h2>
      <p className="post-page__description">
        Миссия ContentCrafter – создать уникальное сообщество людей, увлечённых созданием качественного контента. Мы верим, что каждый
        человек обладает уникальной историей, которая заслуживает быть рассказанной. Наша цель – предоставить всем пользователям удобные и
        мощные инструменты для создания, публикации и продвижения их работ.
      </p>
      <div className="post-page__inner">
        <img className="post-page__image" src="/posts2.jpg" aria-label="post page" alt="post page image" />
      </div>
      <h1 className="post-page__title">Посты на сайте:</h1>
      <p className="posts-count">Найдено постов: {totalPosts}</p>
      <div className="control-panel">
        Выводим записей на странице:
        <input className="search-params" type="text" onChange={(e) => handlerLimitChange(e)} />
      </div>
      <section className="post-catalog">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-info">
                <Avatar />
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
      <div className="pagination-panel">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button className="paggination-button" key={pageNumber} onClick={() => setPage(pageNumber)} disabled={page === pageNumber}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
