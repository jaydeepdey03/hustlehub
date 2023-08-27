import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgotpassword";
import Feed from "./pages/Feed";
import ResetPassword from "./pages/Resetpassword";
import { Box } from "@chakra-ui/react";
import Profile from "./pages/Profile";
import StartupPage from "./pages/StartupPage";
import HackathonPage from "./pages/HackathonPage";

function App() {
  return (
    <Box className="entire-box">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/startup/:id" element={<StartupPage />} />
        <Route path="/hackathon/:id" element={<HackathonPage />} />
      </Routes>
    </Box>
  );
}

export default App;
