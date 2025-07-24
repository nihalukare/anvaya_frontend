import { useState } from "react";
import { BASE_API_URL } from "../config";
import useToast from "../context/ToastContext";
import Toasts from "./Toasts";

function AddAgentForm() {
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  const { showToast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();

    const form = document.querySelector(".needs-validation");
    if (form && !form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = {
      name: agentName,
      email: agentEmail,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/agents`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setAgentName("");
        setAgentEmail("");

        const form = document.querySelector(".needs-validation");
        if (form) {
          form.classList.remove("was-validated");
        }
      } else if (!response.ok) {
        throw new Error("Failed to add agent data.");
      }

      const data = await response.json();
      showToast(data.message, "success");
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <Toasts />
      <div className="text-bg-light p-3">
        <div className="d-flex justify-content-center mb-3">
          <img
            src="/images/agent-profile.jpg"
            className="w-25 img-fluid rounded-circle"
            alt="agent-profile"
          />
        </div>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row mb-3">
            <label htmlFor="agentNameInput" className="col-sm-3 col-form-label">
              Agent Name:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="agentNameInput"
                className="form-control"
                value={agentName}
                onChange={(e) => {
                  setAgentName(e.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter sales agent name.
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="emailInput" className="col-sm-3 col-form-label">
              Email Address:
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                id="emailInput"
                className="form-control"
                value={agentEmail}
                onChange={(e) => {
                  setAgentEmail(e.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                {!agentEmail
                  ? "Please enter sales agent agent email address."
                  : "Please enter valid sales agent email address."}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-outline-primary" type="submit">
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAgentForm;
