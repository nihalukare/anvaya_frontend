import { useFiltersContext } from "../context/FiltersContext";
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useSearchParams } from "react-router";
import { BASE_API_URL } from "../config";

import ClearFiltersBtn from "../components/ClearFiltersBtn";
import SalesAgentFilterSelect from "../components/FilterComponents/SalesAgentFilterSelect";
import PrioritySelect from "../components/FilterComponents/PrioritySelect";
import SortByTimeToClose from "../components/FilterComponents/SortByTimeToClose";

import Header from "../components/Header";
import SidebarMenu from "../components/SidebarMenu";
import DisplayLeadsByStatus from "../components/DisplayLeads/DisplayLeadsByStatus";

function LeadsByStatus() {
  const { leadsAPIUrl, setLeadsAPIUrl, setFilteredLeads } = useFiltersContext();

  const [searchParams, setSearchParams] = useSearchParams({
    salesAgent: "All",
    priority: "All",
  });

  const { data: leadsData, loading, error } = useFetch(leadsAPIUrl);

  const salesAgent = searchParams.get("salesAgent");
  const priority = searchParams.get("priority");

  useEffect(() => {
    let filters = [];
    if (salesAgent && salesAgent !== "All") {
      filters.push(`salesAgent=${salesAgent}`);
    }

    if (priority && priority !== "All") {
      filters.push(`priority=${priority}`);
    }

    setLeadsAPIUrl(
      `${BASE_API_URL}/leads${
        filters.length ? `?` + `${filters.join("&")}` : ""
      }`
    );
  }, [searchParams]);

  useEffect(() => {
    const currentTime = Date.now();
    const processedLeads = leadsData?.data?.map((lead) => {
      let leadCreationTime = new Date(lead.createdAt).getTime();
      let expectedCloseTime = leadCreationTime + lead.timeToClose * 86400000;
      let timeLeftToClose = expectedCloseTime - currentTime;

      return { ...lead, timeLeftToClose: timeLeftToClose };
    });
    setFilteredLeads(processedLeads);
  }, [leadsData]);

  return (
    <>
      <Header headerText={"Leads by Status"} />
      <div className="row">
        <div className="col-md-2">
          <SidebarMenu />
        </div>
        <div className="col-md-10">
          <section>
            <div className="p-2 mb-3 text-bg-light">
              <h2 className="text-body-secondary">Lead List by Status</h2>

              <div>
                <h3 className="text-body-secondary">Filters: </h3>
                <div className="mb-3 d-flex align-items-center">
                  <p className="mb-0 ">
                    <span className="fw-medium me-2">Sales Agent:</span>
                  </p>
                  <div className="col-md-4 me-5">
                    <SalesAgentFilterSelect
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
                <h3 className="text-body-secondary">Sort by: </h3>
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
              {!loading && (
                <div className="accordion" id="leadsByStatus">
                  <DisplayLeadsByStatus status={"New"} />
                  <DisplayLeadsByStatus status={"Contacted"} />
                  <DisplayLeadsByStatus status={"Qualified"} />
                  <DisplayLeadsByStatus status={"Proposal Sent"} />
                  <DisplayLeadsByStatus status={"Closed"} />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LeadsByStatus;
