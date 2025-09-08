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
          setSearchParams();
          showToast("All Filters Cleared", "success");
        }}
      >
        Clear Filters
      </button>
    </>
  );
}
