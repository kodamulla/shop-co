import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";
import ManagerPage from "./Pages/managerdashboard";
import AdminPage from "./Pages/admindashboard";
import HomePage from "./Pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerdashboard" element={<ManagerPage />} />
        <Route path="/admindashboard" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;