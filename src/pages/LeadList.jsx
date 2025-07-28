import { Link, useSearchParams } from "react-router-dom";

import { useFiltersContext } from "../context/FiltersContext";
import ClearFiltersBtn from "../components/ClearFiltersBtn";
import StatusFilterSelect from "../components/StatusFilterSelect";
import SalesAgentFilterSelect from "../components/SalesAgentFilterSelect";

import SortByTimeToClose from "../components/SortByTimeToClose";

import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import Header from "../components/Header";
import DisplayLeadList from "../components/DisplayLeadList";
import PrioritySelect from "../components/PrioritySelect";
import { BASE_API_URL } from "../config";
import SourceFilterSelect from "../components/SourceFilterSelect";
import TagsFilterSelect from "../components/TagsFilterSelect";

function LeadList() {
  const { setFilteredLeads, leadsAPIUrl, setLeadsAPIUrl } = useFiltersContext();

  const [searchParams, setSearchParams] = useSearchParams({
    status: "All",
    salesAgent: "All",
    priority: "All",
    source: "All",
    tags: "All",
  });

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch(leadsAPIUrl);
  let leads = leadsData?.data;

  useEffect(() => {
    const currentTime = Date.now();
    leads = leads?.map((lead) => {
      let leadCreationTime = new Date(lead.createdAt).getTime();
      let expectedCloseTime = leadCreationTime + lead.timeToClose * 86400000;
      let timeLeftToClose = expectedCloseTime - currentTime;

      return { ...lead, timeLeftToClose: timeLeftToClose };
    });
    setFilteredLeads(leads);
  }, [leads]);

  const status = searchParams.get("status");
  const salesAgent = searchParams.get("salesAgent");
  const priority = searchParams.get("priority");
  const source = searchParams.get("source");
  const tags = searchParams.get("tags");

  useEffect(() => {
    let filters = [];
    if (status !== "All") filters.push(`status=${status}`);
    if (salesAgent !== "All") filters.push(`salesAgent=${salesAgent}`);
    if (priority !== "All") filters.push(`priority=${priority}`);
    if (source !== "All") filters.push(`source=${source}`);
    if (tags !== "All") filters.push(`tags=${tags}`);

    setLeadsAPIUrl(() => {
      if (filters.length > 0) {
        return `${BASE_API_URL}/leads?${filters.join("&")}`;
      } else {
        return `${BASE_API_URL}/leads`;
      }
    });
  }, [status, salesAgent, priority, source, tags]);

  return (
    <>
      <Header headerText={"Lead List"} />

      <div className="row">
        <div className="col-md-2">
          <SidebarMenu />
        </div>
        <div className="col-md-10">
          <section>
            {
              <div>
                status: {status} | salesAgent: {salesAgent} | priority:{" "}
                {priority} | source: {source}
              </div>
            }
            <DisplayLeadList
              leadsLoading={leadsLoading}
              leadsError={leadsError}
            />
            <div className="p-2 mb-3 text-bg-light">
              <div>
                <div>
                  <h3 className="text-body-secondary">Filters </h3>
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
                      <span className="fw-medium me-2">Sales Agent:</span>
                    </p>
                    <div className="col-md-4">
                      <SalesAgentFilterSelect
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                      />
                    </div>
                    <ClearFiltersBtn
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                    />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <p className="mb-0 me-2">
                      <span className="fw-medium me-2">Lead Source:</span>
                    </p>
                    <div className="col-md-4 me-5">
                      <SourceFilterSelect
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                      />
                    </div>
                    <p className="mb-0 me-2">
                      <span className="fw-medium me-2">Tags:</span>
                    </p>
                    <div className="col-md-4">
                      <TagsFilterSelect
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-body-secondary">Sort by</h3>
                <div className="mb-3 d-flex align-items-center">
                  <p className="mb-0 ">
                    <span className="fw-medium me-2">Priority:</span>
                  </p>
                  <div className="col-md-4 me-5">
                    <PrioritySelect
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                    />
                  </div>
                  <p className="mb-0 me-2">
                    <span className="fw-medium">Time to Close:</span>
                  </p>
                  <div className="col-md-4">
                    <SortByTimeToClose />
                  </div>
                </div>

                <div>
                  <Link to={"/addLead"} className="btn btn-outline-secondary">
                    Add New Lead
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LeadList;
