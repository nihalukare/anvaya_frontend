import useToast from "../context/ToastContext";

export default function Toasts() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <div
        className="position-fixed top-0 start-50 translate-middle-x mt-5"
        style={{ zIndex: "1055" }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast text-bg-${toast.type} border-0 rounded-0 mb-2 show`}
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">{toast.toastMsg}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                onClick={() => {
                  removeToast(toast.id);
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
