import { useFiltersContext } from "../../context/FiltersContext";

export default function PrioritySort() {
  const { priority, setPriority, setFilteredLeads } = useFiltersContext();

  function sortByPriority(value) {
    function getPriorityOrder(priorityValue) {
      if (priorityValue === "High") return { High: 1, Medium: 2, Low: 3 };
      if (priorityValue === "Medium") return { Medium: 1, High: 2, Low: 3 };
      if (priorityValue === "Low") return { Low: 1, Medium: 2, High: 3 };
    }

    const priorityOrder = getPriorityOrder(value);

    setFilteredLeads((leads) =>
      leads.toSorted(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      )
    );
  }

  return (
    <div className="ms-3">
      <div className="form-check form-check-inline">
        <input
          type="radio"
          id="priorityHigh"
          className="form-check-input"
          name="sortByPriority"
          value={"High"}
          checked={priority === "High"}
          onChange={(e) => {
            setPriority(e.target.value);
            sortByPriority(e.target.value);
          }}
        />
        <label htmlFor="priorityHigh">High</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          id="priorityMedium"
          className="form-check-input"
          name="sortByPriority"
          value={"Medium"}
          checked={priority === "Medium"}
          onChange={(e) => {
            setPriority(e.target.value);
            sortByPriority(e.target.value);
          }}
        />
        <label htmlFor="priorityMedium">Medium</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          id="priorityLow"
          className="form-check-input"
          name="sortByPriority"
          value={"Low"}
          checked={priority === "Low"}
          onChange={(e) => {
            setPriority(e.target.value);
            sortByPriority(e.target.value);
          }}
        />
        <label htmlFor="priorityLow">Low</label>
      </div>
    </div>
  );
}
