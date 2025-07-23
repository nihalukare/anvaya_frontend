import { useFiltersContext } from "../context/FiltersContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function DisplayLeadList({ leadsLoading, leadsError }) {
  const { filteredLeads } = useFiltersContext();
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 15;

  let noOfPages = filteredLeads && Math.ceil(filteredLeads.length / PAGE_SIZE);

  let startIndex = currentPage * PAGE_SIZE;
  let endIndex = startIndex + PAGE_SIZE;

  return (
    <div className="p-2 mb-3 text-bg-light">
      <h2 className="text-bg-light">Lead Overview</h2>
      {leadsLoading && (
        <div className="alert alert-primary" role="alert">
          Loading...
        </div>
      )}
      {leadsError && (
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
      {filteredLeads?.length ? (
        filteredLeads.slice(startIndex, endIndex).map((lead) => (
          <div key={lead._id} className="row">
            <div className="col">{lead.name}</div>
            <div className="col">{lead.status}</div>
            <div className="col">{lead.salesAgent.name}</div>
            <div className="col">
              {lead.status === "Closed" ? (
                "Closed"
              ) : (
                <span
                  className={
                    Math.ceil(lead.timeLeftToClose / 86400000) < 0
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {Math.ceil(lead.timeLeftToClose / 86400000) < 0
                    ? `Lead overdue by ${Math.abs(
                        Math.ceil(lead.timeLeftToClose / 86400000)
                      )} ${
                        Math.abs(Math.ceil(lead.timeLeftToClose / 86400000)) > 1
                          ? "days"
                          : "day"
                      }`
                    : `${Math.ceil(lead.timeLeftToClose / 86400000)} ${
                        Math.ceil(lead.timeLeftToClose / 86400000) > 1
                          ? "days"
                          : "day"
                      }`}
                </span>
              )}
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
      ) : (
        <div className="alert alert-primary" role="alert">
          No leads found.
        </div>
      )}
      <div className="fs-6 text-secondary my-3 text-center">
        (Showing:{" "}
        {noOfPages > 1
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
