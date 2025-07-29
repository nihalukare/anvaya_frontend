import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

import AddAgentForm from "../components/Form/AddAgentForm";

import Header from "../components/Header";
import SidebarMenu from "../components/SidebarMenu";

function SalesAgentManagement() {
  const { data, loading, error } = useFetch(`${BASE_API_URL}/agents`);
  const salesAgents = data?.data;

  return (
    <>
      <Header headerText={"Sales Agent Management"} />
      <div className="row">
        <div className="col-md-2">
          <SidebarMenu />
        </div>
        <div className="col-md-10">
          <section>
            <div className="p-2 mb-3 text-bg-light">
              <h2 className="text-body-secondary mb-3">Sales Agent List</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  Error loading sales agents!
                </div>
              )}
              {loading && (
                <div className="alert alert-primary" role="alert">
                  Loading...
                </div>
              )}
              <div className="row">
                {salesAgents &&
                  salesAgents.map((salesAgent) => (
                    <div key={salesAgent._id} className="col-md-4">
                      <div className="card mb-3">
                        <img
                          src="/images/agent-profile.jpg"
                          className="card-image-top w-25 mx-auto"
                          alt="agent-profile"
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">{salesAgent.name}</h5>
                          <p className="card-text">{salesAgent.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="text-center my-5">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-5"
                  data-bs-toggle="modal"
                  data-bs-target="#addAgentModal"
                >
                  Add New Agent
                </button>
              </div>

              <div
                className="modal fade"
                id="addAgentModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">Add Agent</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <AddAgentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SalesAgentManagement;
