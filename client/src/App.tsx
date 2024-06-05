import { Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage";
import Header from "./components/header/Header";

const App = () => {
  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
