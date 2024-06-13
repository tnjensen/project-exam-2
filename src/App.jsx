import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./pages/protected/ProtectedRoute";
import Profile from "./pages/profile/Profile";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PostDetail from "./components/posts/postDetail/PostDetail";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="profile/:name" element={<Profile />} />
        <Route path="detail/:id" element={<PostDetail />} />
        {/* <Route path="navigation" element={<Sidebar />} /> */}
      </Route>
      <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
