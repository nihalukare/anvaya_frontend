import { BASE_API_URL } from "../config";
import { useFetch } from "../hooks/useFetch";

export default function LeadStatus() {
  const { data, loading, error } = useFetch(`${BASE_API_URL}/leads`);
  const leads = data?.data;

  const statusValues = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  return (
    <div className="p-2 mb-3 text-bg-light">
      <h2 className="text-body-secondary">Lead Status:</h2>
      {loading && (
        <div className="alert alert-primary" role="alert">
          Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <ul>
        {!loading &&
          statusValues.map((statusValue, index) => (
            <li key={index}>
              <span className="fw-medium">{statusValue}:</span>{" "}
              {leads?.filter((lead) => lead.status === statusValue).length}{" "}
              Leads
            </li>
          ))}
      </ul>
    </div>
  );
}
