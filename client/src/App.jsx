import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";

// Manager Imports
import ManagerLayout from "./Pages/manager/ManagerLayout";
import ManagerDashboard from './Pages/manager/ManagerDashboard'; 
import ProductsManagement from "./Pages/manager/ProductsManagement";
import CategoryManagement from "./Pages/manager/CategoryManagement";
import OrdersManagement from "./Pages/manager/OrdersManagement";
import UsersView from "./Pages/manager/UsersView";
import ManagerCouponsManagement from "./Pages/manager/ManagerCouponsManagement";

import HomePage from "./Pages/landing";
import ProfilePage from "./Pages/accountPage"; 
import CartPage from "./Pages/cartPage"; 
import CheckoutPage from "./Pages/checkoutPage";  
import DetailsPage from "./Pages/details";

// Admin Imports
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import ManagerManagement from "./Pages/admin/ManagerManagement";
import UserManagement from "./Pages/admin/UserManagement";
import ProductManagement from "./Pages/admin/ProductManagement";
import Documents from "./Pages/admin/Documents";
import AdminCouponsManagement from "./Pages/admin/AdminCouponsManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Manager Routes with Layout */}
        <Route path="/managerdashboard" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="users" element={<UsersView />} />
          <Route path="coupons" element={<ManagerCouponsManagement />} />
        </Route>
        
        <Route path="/account" element={<ProfilePage />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/details" element={<DetailsPage />} />
        
        {/* Admin Routes with Layout */}
        <Route path="/admindashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="managers" element={<ManagerManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="documents" element={<Documents />} />
          <Route path="coupons" element={<AdminCouponsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;