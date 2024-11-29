import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignUp from "./pages/Signup";
import ProfileRedirect from "./components/profileRedirect";
import CreateHouse from "./pages/CreateHouse";
import EditHouse from "./pages/EditHouse";

function routes() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileRedirect />} />
          <Route
            path="/profile/:profileId"
            element={<Profile />}
          />
          <Route path="/createHouse/" element={
            <ProtectedRoute>
              <CreateHouse />
            </ProtectedRoute>} 
          />
          <Route path="/editHouse/:houseId" element={
            <ProtectedRoute>
              <EditHouse />
            </ProtectedRoute>} 
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default routes;
