import StatusFilterSelect from "../components/StatusFilterSelect";

import SortByTimeToClose from "../components/SortByTimeToClose";
import { useFiltersContext } from "../context/FiltersContext";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

import { BASE_API_URL } from "../config";
import ClearFiltersBtn from "../components/ClearFiltersBtn";
import Header from "../components/Header";
import SidebarMenu from "../components/SidebarMenu";
import DisplayLeadsByAgent from "../components/DisplayLeadsByAgent";
import PrioritySelect from "../components/PrioritySelect";
import { useSearchParams } from "react-router-dom";

function LeadsBySalesAgent() {
  const { leadsAPIUrl, setLeadsAPIUrl, setFilteredLeads } = useFiltersContext();

  const [searchParams, setSearchParams] = useSearchParams({
    status: "All",
    priority: "All",
  });

  const { data, loading, error } = useFetch(leadsAPIUrl);
  let leads = data?.data;

  const {
    data: agentsData,
    loading: agentsLoading,
    error: agentsError,
  } = useFetch(`${BASE_API_URL}/agents`);

  let status = searchParams.get("status");
  let priority = searchParams.get("priority");

  useEffect(() => {
    let filters = [];
    if (status && status !== "All") filters.push(`status=${status}`);
    if (priority && priority !== "All") filters.push(`priority=${priority}`);

    setLeadsAPIUrl(
      `${BASE_API_URL}/leads${
        filters.length ? `?` + `${filters.join("&")}` : ""
      }`
    );
  }, [status, priority]);

  useEffect(() => {
    const currentTime = Date.now();
    leads = leads?.map((lead) => {
      let leadCreationTime = new Date(lead.createdAt).getTime();
      let expectedCloseTime = leadCreationTime + lead.timeToClose * 86400000;
      let timeLeftToClose = expectedCloseTime - currentTime;

      return { ...lead, timeLeftToClose: timeLeftToClose };
    });
    setFilteredLeads(leads);
  }, [data]);

  return (
    <>
      <Header headerText={"Leads by Sales Agent"} />
      <div className="row">
        <div className="col-md-2">
          <SidebarMenu />
        </div>
        <div className="col-md-10">
          <section>
            <div className="p-2 mb-3 text-bg-light">
              <h2 className="text-body-secondary">Lead List by Agent</h2>
              <div>
                <h3 className="text-body-secondary">Filters: </h3>
                <div className="mb-3 d-flex align-items-center">
                  <p className="mb-0 ">
                    <span className="fw-medium me-2">Status:</span>
                  </p>
                  <div className="col-md-4 me-5">
                    <StatusFilterSelect
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                    />
                  </div>
                  <p className="mb-0 me-2">
                    <span className="fw-medium">Priority:</span>
                  </p>
                  <div className="col-md-4">
                    <PrioritySelect
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                    />
                  </div>
                  <ClearFiltersBtn
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                </div>
              </div>
              <div className="mb-3 text-bg-light">
                <h3 className="text-body-secondary">Sort By:</h3>
                <div className="mb-3 d-flex align-items-center">
                  <p className="mb-0 me-3">
                    <span className="fw-medium">Time to Close:</span>
                  </p>
                  <SortByTimeToClose />
                </div>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  Error! Something went wrong.
                </div>
              )}
              {loading && (
                <div className="alert alert-primary" role="alert">
                  Loading...
                </div>
              )}

              <div className="accordion" id="leadsBySalesAgent">
                {agentsData?.data?.map((salesAgent) => (
                  <DisplayLeadsByAgent
                    key={salesAgent._id}
                    leads={leads}
                    salesAgentName={salesAgent.name}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LeadsBySalesAgent;
