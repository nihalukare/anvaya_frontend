import { useFiltersContext } from "../context/FiltersContext";
import Toasts from "./Toasts";
import useToast from "../context/ToastContext";

export default function ClearFiltersBtn({ searchParams, setSearchParams }) {
  const { showToast } = useToast();

  const { setTimeToClose, setPriority, setStatus } = useFiltersContext();

  const salesAgent = searchParams.get("salesAgent");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const source = searchParams.get("source");
  const tags = searchParams.get("tags");

  return (
    <>
      <Toasts />
      <button
        className="btn btn-outline-secondary mx-2"
        onClick={() => {
          setTimeToClose("");
          setPriority("");
          setStatus("All");
          setSearchParams((prev) => {
            if (salesAgent && salesAgent !== "All")
              prev.set("salesAgent", "All");
            if (status && status !== "All") prev.set("status", "All");
            if (priority && priority !== "All") prev.set("priority", "All");
            if (source && source !== "All") prev.set("source", "All");
            if (tags && tags !== "All") prev.set("tags", "All");
            return prev;
          });
          showToast("All Filters Cleared", "success");
        }}
      >
        Clear Filters
      </button>
    </>
  );
}
