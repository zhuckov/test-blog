import { useAuth } from "../context/AuthContext";

const PostsPage = ({}) => {
  const { isAuth } = useAuth();
  return isAuth ? <div>Посты</div> : <div>Войдите что бы авторизоваться</div>;
};

export default PostsPage;
