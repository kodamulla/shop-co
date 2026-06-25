import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";
import Page from "./Pages/managerdashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerdashboard/dashboard" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;