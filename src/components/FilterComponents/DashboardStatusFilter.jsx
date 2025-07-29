import { useFiltersContext } from "../../context/FiltersContext";

export default function DashboardStatusFilter() {
  const { status, setStatus } = useFiltersContext();
  return (
    <div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="statusFilter"
          id="All"
          value="All"
          checked={status === "All"}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="All" className="form-check-label">
          All
        </label>
      </div>

      {[
        ...Array("New", "Contacted", "Qualified", "Proposal Sent", "Closed"),
      ].map((statusValue, index) => (
        <div key={index} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="statusFilter"
            id={statusValue}
            value={statusValue}
            checked={status === statusValue}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label htmlFor={statusValue} className="form-check-label">
            {statusValue}
          </label>
        </div>
      ))}
    </div>
  );
}
