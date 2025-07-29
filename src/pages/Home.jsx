import { BASE_API_URL } from "../config";
import { useFetch } from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";
import { useFiltersContext } from "../context/FiltersContext";
import { useEffect, useState } from "react";

import SidebarMenu from "../components/SidebarMenu";
import Header from "../components/Header";
import ClearFiltersBtn from "../components/ClearFiltersBtn";
import LeadStatus from "../components/LeadStatus";
import Pagination from "../components/Pagination";
import DashboardStatusFilter from "../components/FilterComponents/DashboardStatusFilter";
import TimeLeftToCloseCol from "../components/TimeLeftToCloseCol";

function Home() {
  const { status, leadsAPIUrl, setLeadsAPIUrl } = useFiltersContext();

  const [searchParams, setSearchParams] = useSearchParams();
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

                    <div className="fs-6 text-secondary my-3 text-center">
                      (Showing:{" "}
                      {loading
                        ? "Loading..."
                        : leads?.length === 0
                        ? "No leads assigned to this sales agent"
                        : noOfPages > 1
                        ? `${startIndex + 1}-${endIndex} of total ${
                            leads?.length
                          } leads`
                        : `${leads?.length} total leads`}
                      )
                    </div>

                    <Pagination
                      noOfPages={noOfPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
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
                  <DashboardStatusFilter />
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
