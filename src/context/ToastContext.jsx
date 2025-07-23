import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ToastContext = createContext();

const useToast = () => useContext(ToastContext);
export default useToast;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  function showToast(toastMsg, type) {
    const id = Date.now();

    const newToast = { id, toastMsg, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    }, 3000);
  }

  function removeToast(toastId) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
