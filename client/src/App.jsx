import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";
import ManagerPage from "./Pages/managerdashboard/dashboard";
import AdminPage from "./Pages/admindashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerdashboard/dashboard" element={<ManagerPage />} />
        <Route path="/admindashboard/dashboard" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;