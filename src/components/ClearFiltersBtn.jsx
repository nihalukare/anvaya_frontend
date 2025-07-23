import { useFiltersContext } from "../context/FiltersContext";
import { BASE_API_URL } from "../config";
import Toasts from "./Toasts";
import useToast from "../context/ToastContext";

export default function ClearFiltersBtn({ searchParams, setSearchParams }) {
  const { showToast } = useToast();

  const { setLeadsAPIUrl, setTimeToClose, setStatus } = useFiltersContext();

  const salesAgent = searchParams.get("salesAgent");
  const status = searchParams.get("status");

  return (
    <>
      <Toasts />
      <button
        className="btn btn-outline-secondary mx-2"
        onClick={() => {
          setLeadsAPIUrl(`${BASE_API_URL}/leads`);
          setTimeToClose("");
          showToast("All Filters Cleared", "success");
          setStatus("All");
          setSearchParams(
            (prev) => {
              if (salesAgent) prev.set("salesAgent", "All");
              if (status) prev.set("status", "All");
              prev.set("priority", "All");
              return prev;
            },
            { replace: true }
          );
        }}
      >
        Clear Filters
      </button>
    </>
  );
}
