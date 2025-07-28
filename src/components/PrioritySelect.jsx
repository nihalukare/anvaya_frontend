export default function PrioritySelect({ searchParams, setSearchParams }) {
  return (
    <>
      <select
        name="priority"
        id="prioritySelect"
        className="form-select"
        value={searchParams.get("priority")}
        onChange={(e) => {
          setSearchParams((prev) => {
            prev.set("priority", e.target.value);
            return prev;
          });
        }}
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </>
  );
}
