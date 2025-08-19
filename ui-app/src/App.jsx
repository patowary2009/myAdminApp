import "./App.css";
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import ViewEditUser from "./pages/user/view-edit-user/ViewEditUser";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/login/Login";
import Unauthorized from "./pages/unauthorized/unauthorized";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppHeader />
        <div className="page-content">
          <nav>
            <Link to="/">Home</Link> | <Link to="/user">User List</Link>
          </nav>

          <Routes>
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route
              path="user"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="user/:id/"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <ViewEditUser />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
        <AppFooter />
      </AuthProvider>
    </div>
  );
}

export default App;
