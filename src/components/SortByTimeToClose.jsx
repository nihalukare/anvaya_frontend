import { useFiltersContext } from "../context/FiltersContext";

export default function SortByTimeToClose() {
  const { timeToClose, setTimeToClose, setFilteredLeads } = useFiltersContext();

  function sortByTimeToClose(timeToCloseValue) {
    if (timeToCloseValue === "shortestFirst")
      setFilteredLeads((leads) =>
        leads.toSorted((a, b) => a.timeLeftToClose - b.timeLeftToClose)
      );
    else if (timeToCloseValue === "longestFirst")
      setFilteredLeads((leads) =>
        leads.toSorted((a, b) => b.timeLeftToClose - a.timeLeftToClose)
      );
  }

  return (
    <div className="ms-3">
      <div className="form-check form-check-inline">
        <input
          type="radio"
          id="shortestFirst"
          className="form-check-input"
          name="sortByTimeToClose"
          value={"shortestFirst"}
          checked={timeToClose === "shortestFirst"}
          onChange={(e) => {
            setTimeToClose(e.target.value);
            sortByTimeToClose(e.target.value);
          }}
        />
        <label htmlFor="shortestFirst">Nearest First</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          id="longestFirst"
          className="form-check-input"
          name="sortByTimeToClose"
          value={"longestFirst"}
          checked={timeToClose === "longestFirst"}
          onChange={(e) => {
            setTimeToClose(e.target.value);
            sortByTimeToClose(e.target.value);
          }}
        />
        <label htmlFor="longestFirst">Farthest First</label>
      </div>
    </div>
  );
}
