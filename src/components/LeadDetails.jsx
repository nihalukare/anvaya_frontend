import { BASE_API_URL } from "../config";
import { useState } from "react";

import useForm from "../context/FormContext";
import useToast from "../context/ToastContext";

import LeadForm from "./Form/LeadForm";

function LeadDetails({ leadDetails, loading }) {
  const {
    leadName,
    leadSource,
    salesAgent,
    leadStatus,
    priority,
    timeToClose,
    tags,
    setLeadName,
    setLeadSource,
    setSalesAgent,
    setLeadStatus,
    setPriority,
    setTimeToClose,
    setTags,
    setFormSubmitted,
  } = useForm();

  const { showToast } = useToast();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  function handleEdit() {
    try {
      setLeadName(leadDetails.name);
      setLeadSource(leadDetails.source);
      setSalesAgent(leadDetails.salesAgent._id);
      setLeadStatus(leadDetails.status);
      setPriority(leadDetails.priority);
      setTimeToClose(leadDetails.timeToClose);
      setTags(leadDetails.tags.map((tag) => ({ value: tag, label: tag })));

      const form = document.querySelector(".needs-validation");
      if (form) {
        form.classList.remove("was-validated");
      }
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  async function editLeadDetail() {
    const formData = {
      name: leadName,
      source: leadSource,
      salesAgent: salesAgent,
      status: leadStatus,
      tags: tags.map((tag) => tag.value),
      timeToClose: parseInt(timeToClose),
      priority: priority,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/leads/${leadDetails._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add data.");
      } else {
        setLeadName("");
        setLeadSource("");
        setSalesAgent("");
        setLeadStatus("");
        setPriority("");
        setTimeToClose("");
        setTags([]);
        setFormSubmitted(false);

        const form = document.querySelector(".needs-validation");
        if (form) {
          form.classList.remove("was-validated");
        }
      }
      const data = await response.json();

      setUpdateSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <h2 className="text-body-secondary">Lead Details</h2>
      {loading && (
        <div>
          <p>
            <span className="fw-medium">Lead Name:</span> Loading...
          </p>
          <p>
            <span className="fw-medium">Sales Agent:</span> Loading...
          </p>
          <p>
            <span className="fw-medium">Lead Source:</span> Loading...
          </p>
          <p>
            <span className="fw-medium">Lead Status:</span> Loading...
          </p>
          <p>
            <span className="fw-medium">Priority:</span> Loading...
          </p>
          <p>
            <span className="fw-medium">Time to Close:</span> Loading...
          </p>
        </div>
      )}
      {leadDetails && (
        <div>
          <p>
            <span className="fw-medium">Lead Name:</span> {leadDetails.name}
          </p>
          <p>
            <span className="fw-medium">Sales Agent:</span>{" "}
            {leadDetails.salesAgent.name}
          </p>
          <p>
            <span className="fw-medium">Lead Source:</span> {leadDetails.source}
          </p>
          <p>
            <span className="fw-medium">Lead Status:</span> {leadDetails.status}
          </p>
          <p>
            <span className="fw-medium">Priority:</span> {leadDetails.priority}
          </p>
          <p>
            <span className="fw-medium">Time to Close:</span>{" "}
            {leadDetails.timeToClose}
          </p>
          <p>
            <span className="fw-medium">Tags:</span>{" "}
            {leadDetails.tags.join(", ")}
          </p>
        </div>
      )}
      <div>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#editLead"
          onClick={handleEdit}
        >
          🖋️ Edit Lead Details
        </button>
      </div>

      <div
        className="modal fade"
        id="editLead"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Lead Data</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <LeadForm submitFunction={editLeadDetail} isEdit={true} />
              {updateSuccess && (
                <div
                  className="alert alert-success position-absolute top-0 start-50 translate-middle-x"
                  role="alert"
                >
                  Lead details updated successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadDetails;
