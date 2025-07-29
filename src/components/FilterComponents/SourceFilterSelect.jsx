export default function SourceFilterSelect({ searchParams, setSearchParams }) {
  return (
    <select
      name="sourceFilter"
      id="sourceFilter"
      className="form-select"
      value={searchParams.get("source")}
      onChange={(e) => {
        setSearchParams((prev) => {
          prev.set("source", e.target.value);
          return prev;
        });
      }}
    >
      <option value="All">All</option>
      <option value="Website">Website</option>
      <option value="Referral">Referral</option>
      <option value="Cold Call">Cold Call</option>
      <option value="Advertisement">Advertisement</option>
      <option value="Email">Email</option>
      <option value="Other">Other</option>
    </select>
  );
}
