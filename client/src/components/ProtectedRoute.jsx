import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ModernAlert } from "@/components/ui/ModernAlert"; // අලුත් Alert එක Import කළා

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Alert එකේ OK එබුවම වෙනස් කරන්න State එකක් හැදුවා
  const [shouldRedirect, setShouldRedirect] = useState(false); 

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== 'admin' && user.role !== allowedRole) {
    
    // OK බට්න් එක එබුවට පස්සේ මේක වැඩ කරලා Home Page එකට යනවා
    if (shouldRedirect) {
      return <Navigate to="/" />;
    }

    // ඒකට කලින්, අලුත් ලස්සන Error Alert එක පෙන්නනවා
    return (
      <ModernAlert
        isOpen={true}
        onClose={() => setShouldRedirect(true)}
        onConfirm={() => setShouldRedirect(true)}
        title="Access Denied!"
        message="You do not have permission to access this page."
        type="error" // මේකෙන් රතු පාට අයිකන් එක එනවා
        confirmText="OK"
      />
    );
  }

  return children;
}