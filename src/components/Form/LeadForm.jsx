import { useFetch } from "../../hooks/useFetch";
import { BASE_API_URL } from "../../config";

import Select from "react-select";
import useForm from "../../context/FormContext";
import useToast from "../../context/ToastContext";

function LeadForm({ submitFunction, isEdit }) {
  const { showToast } = useToast();
  const { data, loading, error } = useFetch(`${BASE_API_URL}/agents`);
  const salesAgents = data?.data;

  if (error) {
    showToast(error, "danger");
  }

  const options = [
    { value: "High Value", label: "High Value" },
    { value: "Follow-up", label: "Follow-up" },
  ];

  const {
    leadName,
    setLeadName,
    leadSource,
    setLeadSource,
    salesAgent,
    setSalesAgent,
    leadStatus,
    setLeadStatus,
    priority,
    setPriority,
    timeToClose,
    setTimeToClose,
    tags,
    setTags,
    formSubmitted,
    setFormSubmitted,
  } = useForm();

  function handleSubmit(e) {
    e.preventDefault();

    setFormSubmitted(true);
    const form = document.querySelector(".needs-validation");
    if (form && !form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    submitFunction();
  }

  return (
    <form
      className="py-5 bg-light needs-validation"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="leadNameInput">Lead Name:</label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            id="leadNameInput"
            className="form-control"
            placeholder="Enter Name of the potential customer or company"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please enter a lead name.</div>
        </div>
      </div>
      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="leadSourceInput">Lead Source:</label>
        </div>
        <div className="col-md-6">
          <select
            id="leadSourceInput"
            className="form-select"
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Click to Select --
            </option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
          <div className="invalid-feedback">Please select lead source.</div>
        </div>
      </div>
      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="salesAgentInput">Sales Agent:</label>
        </div>
        <div className="col-md-6">
          <select
            id="salesAgentInput"
            className="form-select"
            value={salesAgent}
            onChange={(e) => setSalesAgent(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Click to Select --
            </option>
            {salesAgents
              ? salesAgents.map((salesAgent) => (
                  <option key={salesAgent._id} value={salesAgent._id}>
                    {salesAgent.name}
                  </option>
                ))
              : loading && <option>Loading...</option>}
          </select>
          <div className="invalid-feedback">Please select sales agent.</div>
        </div>
      </div>

      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="leadStatusInput">Lead Status:</label>
        </div>
        <div className="col-md-6">
          <select
            id="leadStatusInput"
            className="form-select"
            value={leadStatus}
            onChange={(e) => setLeadStatus(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Click to Select --
            </option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="invalid-feedback">Please select lead status.</div>
        </div>
      </div>

      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="priorityInput">Priority:</label>
        </div>
        <div className="col-md-6">
          <select
            id="priorityInput"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Click to Select --
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="invalid-feedback">Please select priority.</div>
        </div>
      </div>

      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="timeToCloseInput">Time to Close:</label>
        </div>
        <div className="col-md-6">
          <input
            id="timeToCloseInput"
            type="text"
            className="form-control"
            placeholder="Enter Estimated time (in days) to close the deal."
            value={timeToClose}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setTimeToClose(value);
              }
            }}
            required
          />
          <div className="invalid-feedback">Please enter time to close.</div>
        </div>
      </div>

      <div className="row align-items-center mb-3 justify-content-center">
        <div className="col-md-2 fw-normal fs-5">
          <label htmlFor="tagsInput">Tags:</label>
        </div>
        <div className="col-md-6">
          <Select
            inputId="tagsInput"
            name="tags"
            options={options}
            isMulti={true}
            placeholder="-- Click to Select --"
            value={tags}
            onChange={(selectedOption) => setTags(selectedOption)}
            classNamePrefix="react-select"
            className={formSubmitted && tags.length === 0 ? "is-invalid" : ""}
          />
          {formSubmitted && tags.length === 0 && (
            <div className="invalid-feedback">
              Please select at least one tag.
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button type="submit" className="btn btn-primary w-25">
          {isEdit ? "Save Lead" : "Create Lead"}
        </button>
      </div>
    </form>
  );
}

export default LeadForm;
