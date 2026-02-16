import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import ProfilePage from "./pages/Profile/Profile";
import { $storeAuth, getTokenBrowser } from "./features/Auth_effector";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { ProtectedRoute } from "./routes/ProtectedRoute";
function App() {
  const navigate = useNavigate();
  const [storeAuth] = useUnit([$storeAuth]);
  useEffect(() => {
    getTokenBrowser();
  }, []);
  useEffect(() => {
    if (storeAuth.auth) {
      navigate("/profile");
    }
  }, [storeAuth.auth]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
