import { BASE_API_URL } from "../config";
import { useFetch } from "../hooks/useFetch";

import TotalLeadsInPipeline from "../components/Charts/TotalLeadsInPipeline";
import ClosedLeadsGraph from "../components/Charts/ClosedLeadsGraph";
import LeadStatusGraph from "../components/Charts/LeadStatusGraph";
import LeadsClosedLastWeek from "../components/Charts/LeadsClosedLastWeek";

import Header from "../components/Header";
import SidebarMenu from "../components/SidebarMenu";

function Reports() {
  const { data, loading, error } = useFetch(`${BASE_API_URL}/leads`);
  const leads = data?.data;

  return (
    <>
      <Header headerText={"CRM Reports"} />
      <div className="row">
        <div className="col-md-2">
          <SidebarMenu />
        </div>
        <div className="col-md-10">
          <section>
            <div className="p-2 text-bg-light">
              <h2 className="text-body-secondary mb-3">Reports Overview</h2>

              <div className="row">
                <div className="col-md-6">
                  <h3 className="text-body-secondary">
                    Leads Closed Last Week:
                  </h3>
                  <div className="mb-3 w-75 mx-md-auto">
                    <LeadsClosedLastWeek />
                  </div>
                </div>
                <div className="col-md-6">
                  <h3 className="text-body-secondary">
                    Total Leads closed and in Pipeline:
                  </h3>
                  <div className="mb-3 w-75 mx-md-auto">
                    {loading && (
                      <div className="alert alert-primary" role="alert">
                        Loading...
                      </div>
                    )}
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        Error! Something went wrong.
                      </div>
                    )}
                    <TotalLeadsInPipeline leads={leads} />
                  </div>
                </div>
              </div>

              <h3 className="text-body-secondary">
                Leads Closed by Sales Agent:
              </h3>
              <div className="mb-5 w-75 mx-md-auto">
                {loading && (
                  <div className="alert alert-primary" role="alert">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Error! Something went wrong.
                  </div>
                )}
                <ClosedLeadsGraph leads={leads} />
              </div>

              <h3 className="text-body-secondary">Lead Status Distribution:</h3>
              <div className="mb-3 w-75 mx-md-auto">
                {loading && (
                  <div className="alert alert-primary" role="alert">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Error! Something went wrong.
                  </div>
                )}
                <LeadStatusGraph leads={leads} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Reports;
