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
import UserManagement from "./Pages/admin/UserManagement";
import ProductManagement from "./Pages/admin/ProductManagement";
import Documents from "./Pages/admin/Documents";


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
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;