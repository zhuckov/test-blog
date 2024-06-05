import { Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
