import { Link } from "react-router-dom";
import { useFiltersContext } from "../../context/FiltersContext";
import { useState } from "react";

import Pagination from "../Pagination";
import TimeLeftToCloseCol from "../TimeLeftToCloseCol";

export default function DisplayLeadsByStatus({ status }) {
  const { filteredLeads } = useFiltersContext();

  const [currentPage, setCurrentPage] = useState(0);

  const displayLeads = filteredLeads?.filter((lead) => {
    return lead.status === status;
  });

  const PAGE_SIZE = 5;

  let noOfPages = displayLeads && Math.ceil(displayLeads.length / PAGE_SIZE);

  let startIndex = currentPage * PAGE_SIZE;
  let endIndex = startIndex + PAGE_SIZE;

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#leadsBy${status.split(" ").join("")}`}
          >
            <strong className="me-1">Status:</strong> {status}
          </button>
        </h2>
        <div
          id={`leadsBy${status.split(" ").join("")}`}
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            <p className="mb-2">
              <span className="fw-medium">Showing:</span>{" "}
              {displayLeads?.length === 0
                ? "No leads for this status"
                : noOfPages > 1
                ? `${startIndex + 1}-${endIndex} of total ${
                    displayLeads?.length
                  } leads`
                : `${displayLeads?.length} total leads`}
            </p>
            {displayLeads?.length > 0 && (
              <div className="row">
                <div className="col">
                  <strong>Lead Name</strong>
                </div>
                <div className="col">
                  <strong>Assigned Agent</strong>
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

            {displayLeads?.slice(startIndex, endIndex).map((lead) => (
              <div key={lead._id} className="row">
                <div className="col">{lead.name}</div>
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
            ))}

            <Pagination
              noOfPages={noOfPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
