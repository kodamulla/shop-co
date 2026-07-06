import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./Pages/signin";
import SignupPage from "./Pages/signup";
import HomePage from "./Pages/landing";
import ProfilePage from "./Pages/accountPage"; 
import CartPage from "./Pages/cartPage"; 
import CheckoutPage from "./Pages/checkoutPage"; 
import DetailsPage from "./Pages/details";
import ClothingPage from "./Pages/ClothingPage";

// Settings Pages
import AccountSettings from "./pages/AccountSettings"; // Admin සඳහා
import ManagerSettings from "./pages/ManagerSettings"; // Manager සඳහා

// Manager Imports
import ManagerLayout from "./Pages/manager/ManagerLayout";
import ManagerDashboard from './Pages/manager/ManagerDashboard'; 
import ProductsManagement from "./Pages/manager/ProductsManagement";
import CategoryManagement from "./Pages/manager/CategoryManagement";
import OrdersManagement from "./Pages/manager/OrdersManagement";
import UsersView from "./Pages/manager/UsersView";
import ManagerCouponsManagement from "./Pages/manager/ManagerCouponsManagement";

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
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<ProfilePage />} /> 
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/clothing" element={<ClothingPage />} />
          
          {/* Manager Routes: allowedRole="manager" විතරයි */}
          <Route path="/managerdashboard" element={
            <ProtectedRoute allowedRole="manager"><ManagerLayout /></ProtectedRoute>
          }>
            <Route index element={<ManagerDashboard />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="users" element={<UsersView />} />
            <Route path="coupons" element={<ManagerCouponsManagement />} />
            <Route path="settings" element={<ManagerSettings />} />
          </Route>
          
          {/* Admin Routes: allowedRole="admin" විතරයි */}
          <Route path="/admindashboard" element={
            <ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="managers" element={<ManagerManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="documents" element={<Documents />} />
            <Route path="coupons" element={<AdminCouponsManagement />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;