export default function TagsFilterSelect({ searchParams, setSearchParams }) {
  return (
    <select
      name="tagsFilter"
      id="tagsFilter"
      className="form-select"
      value={searchParams.get("tags")}
      onChange={(e) => {
        setSearchParams((prev) => {
          prev.set("tags", e.target.value);
          return prev;
        });
      }}
    >
      <option value="All">All</option>
      <option value="High Value">High Value</option>
      <option value="Follow-up">Follow-up</option>
    </select>
  );
}
