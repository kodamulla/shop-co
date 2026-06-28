import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";
import ManagerPage from "./Pages/managerdashboard";
import AdminPage from "./Pages/admin/AdminDashboard";
import HomePage from "./Pages/landing";
import ProfilePage from "./Pages/accountPage"; 
import CartPage from "./Pages/cartPage"; 
import CheckoutPage from "./Pages/checkoutPage";  
import DetailsPage from "./Pages/details";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import ManagerManagement from "./Pages/admin/ManagerManagement";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerdashboard" element={<ManagerPage />} />
        <Route path="/admindashboard" element={<AdminPage />} />
        <Route path="/account" element={<ProfilePage />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/details" element={<DetailsPage />} />
        
        <Route path="/admindashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="managers" element={<ManagerManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;