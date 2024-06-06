import { Navigate, Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostPage/PostsPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage";
import Header from "./components/header/Header";
import { useAuth } from "./context/AuthContext";
import CreatePostPage from "./pages/CreatePost/CreatePost";
import MyPostsPage from "./pages/MyPosts/MyPostsPage";

const App = () => {
  const { isAuth } = useAuth();
  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={!isAuth ? <Navigate to="/login" replace /> : <PostsPage />} />
          <Route path="/registration" element={isAuth ? <Navigate to="/" replace /> : <RegistrationPage />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/create-post" element={!isAuth ? <Navigate to="/login" replace /> : <CreatePostPage />} />
          <Route path="/my-posts" element={!isAuth ? <Navigate to="/login" replace /> : <MyPostsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
