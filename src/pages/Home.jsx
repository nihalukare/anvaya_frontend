import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";
import SidebarMenu from "../components/SidebarMenu";
import Header from "../components/Header";
import { Link, useSearchParams } from "react-router-dom";
import ClearFiltersBtn from "../components/ClearFiltersBtn";
import { useFiltersContext } from "../context/FiltersContext";
import { useEffect, useState } from "react";
import LeadStatus from "../components/LeadStatus";

function Home() {
  const { status, setStatus, leadsAPIUrl, setLeadsAPIUrl } =
    useFiltersContext();

  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(0);

  const { data, loading, error } = useFetch(leadsAPIUrl);
  let leads = data?.data?.map((lead) => {
    const currentTime = Date.now();
    let leadCreationTime = new Date(lead.createdAt).getTime();
    let expectedCloseTime = leadCreationTime + lead.timeToClose * 86400000;
    let timeLeftToClose = expectedCloseTime - currentTime;

    return { ...lead, timeLeftToClose };
  });

  const PAGE_SIZE = 10;

  let noOfPages = leads && Math.ceil(leads.length / PAGE_SIZE);

  let startIndex = currentPage * PAGE_SIZE;
  let endIndex = startIndex + PAGE_SIZE;

  useEffect(() => {
    if (status !== "All")
      setLeadsAPIUrl(`${BASE_API_URL}/leads?status=${status}`);
    else setLeadsAPIUrl(`${BASE_API_URL}/leads`);
  }, [status]);

  return (
    <>
      <Header headerText={"Anvaya CRM Dashboard"} />
      <main>
        <div className="row">
          <div className="col-md-2">
            <SidebarMenu />
          </div>
          <div className="col-md-10">
            <section>
              <div className="p-2 mb-3 text-bg-light">
                <div className="px-3">
                  <h2 className="text-body-secondary">Main Content </h2>
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
                  <div>
                    {leads?.length && (
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
                    {leads?.length &&
                      leads.slice(startIndex, endIndex).map((lead) => (
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
                                      Math.abs(
                                        Math.ceil(
                                          lead.timeLeftToClose / 86400000
                                        )
                                      ) > 1
                                        ? "days"
                                        : "day"
                                    }`
                                  : `${Math.ceil(
                                      lead.timeLeftToClose / 86400000
                                    )} ${
                                      Math.ceil(
                                        lead.timeLeftToClose / 86400000
                                      ) > 1
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
                      ))}
                    <div className="fs-6 text-secondary my-3 text-center">
                      (Showing:{" "}
                      {leads?.length === 0
                        ? "No leads assigned to this sales agent"
                        : noOfPages > 1
                        ? `${startIndex + 1}-${endIndex} of total ${
                            leads?.length
                          } leads`
                        : `${leads?.length} total leads`}
                      )
                    </div>

                    {noOfPages > 1 ? (
                      <nav>
                        <ul className="pagination justify-content-center">
                          <li
                            className={`page-item ${
                              currentPage < 1 ? " disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              aria-label="previous"
                              onClick={() => {
                                setCurrentPage((prev) => prev - 1);
                              }}
                            >
                              <span>&laquo;</span>
                            </button>
                          </li>
                          {[...Array(noOfPages).keys()].map((n) => (
                            <li
                              key={n}
                              className={`page-item ${
                                currentPage === n ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(n)}
                              >
                                <span>{n + 1}</span>
                              </button>
                            </li>
                          ))}

                          <li
                            className={`page-item ${
                              currentPage > noOfPages - 2 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              aria-label="next"
                              onClick={() => {
                                setCurrentPage((prev) => prev + 1);
                              }}
                            >
                              <span>&raquo;</span>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    ) : null}
                  </div>
                </div>
              </div>
              <LeadStatus />
              <div className="p-2 mb-3 text-bg-light">
                <h2 className="text-body-secondary">Quick Filters:</h2>
                <div className="mb-3 d-flex align-items-center">
                  <p className="mb-0 me-3">
                    <span className="fw-medium">Status:</span>
                  </p>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="statusFilter"
                        id="All"
                        value="All"
                        checked={status === "All"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label htmlFor="All" className="form-check-label">
                        All
                      </label>
                    </div>

                    {[
                      ...Array(
                        "New",
                        "Contacted",
                        "Qualified",
                        "Proposal Sent",
                        "Closed"
                      ),
                    ].map((statusValue, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="statusFilter"
                          id={statusValue}
                          value={statusValue}
                          checked={status === statusValue}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label
                          htmlFor={statusValue}
                          className="form-check-label"
                        >
                          {statusValue}
                        </label>
                      </div>
                    ))}
                  </div>
                  <ClearFiltersBtn
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                </div>
                <div>
                  <Link to={"/addLead"} className="btn btn-outline-secondary">
                    Add New Lead
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
