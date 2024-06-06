import React, { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { createPost } from "../../services/post";
import "./create-post.css";

const CreatePostPage: React.FC = () => {
  const { userLogin } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const createPostFormData = new FormData();
    createPostFormData.append("title", title);
    createPostFormData.append("content", content);
    createPostFormData.append("author_login", userLogin ?? "");

    const response = await createPost(createPostFormData).then((data) => {
      setTitle("");
      setContent("");
    });
  };

  return (
    <div className="create-post-container">
      <h1>Создать новый пост</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Название поста:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="content">Текст поста:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button className="create-post" type="submit">
          Создать пост
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreatePostPage;
