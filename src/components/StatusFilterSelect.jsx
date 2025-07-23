export default function StatusFilterSelect({ searchParams, setSearchParams }) {
  return (
    <select
      name="statusFilter"
      id="statusFilter"
      className="form-select"
      value={searchParams.get("status")}
      onChange={(e) => {
        setSearchParams(
          (prev) => {
            prev.set("status", e.target.value);
            return prev;
          },
          { replace: true }
        );
      }}
    >
      <option value="All">All</option>
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Proposal Sent">Proposal Sent</option>
      <option value="Closed">Closed</option>
    </select>
  );
}
