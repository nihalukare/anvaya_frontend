import { useFiltersContext } from "../../context/FiltersContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../Pagination";
import TimeLeftToCloseCol from "../TimeLeftToCloseCol";

export default function DisplayLeadList({ loading, error }) {
  const { filteredLeads } = useFiltersContext();
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 15;

  let noOfPages = filteredLeads && Math.ceil(filteredLeads.length / PAGE_SIZE);

  let startIndex = currentPage * PAGE_SIZE;
  let endIndex = startIndex + PAGE_SIZE;

  return (
    <div className="p-2 mb-3 text-bg-light">
      <h2 className="text-bg-light">Lead Overview</h2>
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

      {filteredLeads?.length && (
        <div className="row">
          <div className="col">
            <strong>Lead Name</strong>
          </div>
          <div className="col">
            <strong>Status</strong>
          </div>
          <div className="col">
            <strong>Assigned Sales Agent</strong>
          </div>
          <div className="col">
            <strong>Estimated Time To Close</strong>
          </div>
          <div className="col">
            <strong>Priority</strong>
          </div>
          <div className="col">
            <strong>Actions</strong>
          </div>
        </div>
      )}
      {filteredLeads?.length
        ? filteredLeads.slice(startIndex, endIndex).map((lead) => (
            <div key={lead._id} className="row">
              <div className="col">{lead.name}</div>
              <div className="col">{lead.status}</div>
              <div className="col">{lead.salesAgent.name}</div>
              <div className="col">
                <TimeLeftToCloseCol lead={lead} />
              </div>
              <div className="col">
                {lead.priority === "High" && `🔴${lead.priority}`}
                {lead.priority === "Medium" && `🟡${lead.priority}`}
                {lead.priority === "Low" && `🟢${lead.priority}`}
              </div>
              <div className="col">
                <Link to={`/leadManagement/${lead._id}`}>View</Link>
              </div>
            </div>
          ))
        : !loading && (
            <div className="alert alert-primary" role="alert">
              No leads found.
            </div>
          )}
      <div className="fs-6 text-secondary my-3 text-center">
        (Showing:{" "}
        {loading
          ? "Loading..."
          : noOfPages > 1
          ? `${startIndex + 1}-${endIndex} of total ${
              filteredLeads?.length
            } leads`
          : `${filteredLeads?.length} total leads`}
        )
      </div>
      <Pagination
        noOfPages={noOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
