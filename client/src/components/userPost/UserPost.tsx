import { useState } from "react";
import UpdateForm from "../../pages/UpdateForm/UpdateForm";

interface IPost {
  id: number;
  title: string;
  author_login: string;
  content: string;
  created_at: string;
  removeHandler?: (id: number) => void;
}

export interface IUpdateInfo {
  utitle: string;
  ucontent: string;
}

const UserPost = ({ id, author_login, created_at, title, content, removeHandler }: IPost) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<IUpdateInfo | null>(null);
  return (
    <div className="post-item">
      <div className="post-info">
        <div className="about-post">
          <p className="info-text">
            <span>Автор:</span>{" "}
            {author_login && author_login.length > 1
              ? author_login.slice(0, 1).toUpperCase() + author_login.slice(1, author_login.length)
              : author_login}
          </p>
          <p className="info-text">
            <span>Дата поста:</span> {created_at}
          </p>
        </div>
      </div>
      <h2>{updateInfo?.utitle ? updateInfo.utitle : title}</h2>
      <p className="content-text">{updateInfo?.ucontent ? updateInfo.ucontent : content}</p>

      <div className="post-buttons">
        <button
          onClick={() => {
            removeHandler ? removeHandler(id) : console.log("Удаление невозможно");
          }}
        >
          Удалить
        </button>
        <button onClick={() => setIsEdit(!isEdit)}>{isEdit ? "Скрыть панель редактирования" : "Показать панель редактирования"}</button>
      </div>
      {isEdit && <UpdateForm setUpdateInfo={setUpdateInfo} post={{ id, title, content }} />}
    </div>
  );
};

export default UserPost;
