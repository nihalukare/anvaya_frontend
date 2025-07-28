import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

export default function SalesAgentFilterSelect({
  searchParams,
  setSearchParams,
}) {
  const {
    data: agentsData,
    loading: agentsLoading,
    error: agentsError,
  } = useFetch(`${BASE_API_URL}/agents`);

  return (
    <select
      name="salesAgentFilter"
      id="salesAgentFilter"
      className="form-select"
      value={searchParams.get("salesAgent")}
      onChange={(e) => {
        setSearchParams((prev) => {
          prev.set("salesAgent", e.target.value);
          return prev;
        });
      }}
    >
      <option value="All">All</option>
      {agentsData?.data?.map((agentData) => (
        <option key={agentData._id} value={agentData._id}>
          {agentData.name}
        </option>
      ))}
    </select>
  );
}
