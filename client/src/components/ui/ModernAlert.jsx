import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

export function ModernAlert({ isOpen, onClose, onConfirm, title, message, type = "success", showCancel = false, confirmText = "Continue", cancelText = "Cancel" }) {
  
  const config = {
    success: {
      icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
      bg: "bg-green-100",
      btn: "bg-blue-600 hover:bg-blue-700 text-white", // බට්න් එක ඔයා ඉල්ලපු විදිහටම තිබ්බා
    },
    error: {
      icon: <XCircle className="w-8 h-8 text-red-500" />,
      bg: "bg-red-100",
      btn: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
      icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
      bg: "bg-amber-100",
      btn: "bg-amber-500 hover:bg-amber-600 text-white",
    }
  };

  const current = config[type] || config.success;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[90vw] max-w-[340px] rounded-[32px] p-6 gap-0 border-slate-100 shadow-2xl bg-white outline-none">
        
        {/* shadcn වල default left-align වෙන එක override කරලා, හැමදේම Center කළා */}
        <AlertDialogHeader className="flex flex-col items-center justify-center text-center sm:text-center sm:items-center w-full space-y-4">
          
          <div className={`p-4 rounded-full ${current.bg} bg-opacity-50 flex items-center justify-center mx-auto`}>
            {current.icon}
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <AlertDialogTitle className="text-xl font-bold text-slate-900 tracking-tight text-center w-full">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-medium text-slate-500 leading-relaxed text-center w-full">
              {message}
            </AlertDialogDescription>
          </div>

        </AlertDialogHeader>

        <AlertDialogFooter className="w-full mt-6 flex-col sm:flex-row gap-3 sm:space-x-0">
          {showCancel && (
            <AlertDialogCancel 
              onClick={onClose}
              className="w-full sm:w-1/2 h-12 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border-none transition-all m-0"
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction 
            onClick={onConfirm} 
            className={`w-full ${showCancel ? 'sm:w-1/2' : ''} h-12 rounded-xl font-bold transition-all m-0 shadow-none ${current.btn}`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
        
      </AlertDialogContent>
    </AlertDialog>
  )
}