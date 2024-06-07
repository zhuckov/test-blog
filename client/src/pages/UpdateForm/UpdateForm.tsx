import { FormEvent, useState } from "react";
import { updatePost } from "../../services/post";
import "./update.css";
import { IUpdateInfo } from "../../components/userPost/UserPost";
export interface IPostUpdate {
  id: number;
  title: string;
  content: string;
}

interface IPostUpdateProps {
  post: IPostUpdate;
  setUpdateInfo: ({ utitle, ucontent }: IUpdateInfo) => void;
}

const UpdateForm = ({ post, setUpdateInfo }: IPostUpdateProps) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatePostFormData = new FormData();
      updatePostFormData.append("id", post.id.toString());
      updatePostFormData.append("title", title);
      updatePostFormData.append("content", content);

      const response = await updatePost(updatePostFormData);
      setUpdateInfo({
        utitle: title,
        ucontent: content,
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div>
        <label className="update-form__label" htmlFor="title">
          Название поста:
        </label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="update-form__label" htmlFor="content">
          Текст поста:
        </label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <button className="update-form__btn" type="submit">
        Обновить пост
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default UpdateForm;
