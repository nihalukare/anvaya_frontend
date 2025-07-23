import { BASE_API_URL } from "../config";

import Header from "../components/Header";

import LeadForm from "../components/LeadForm";
import useForm from "../context/FormContext";
import useToast from "../context/ToastContext";

import Toasts from "../components/Toasts";
import { Link } from "react-router-dom";

function AddLead() {
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

  async function addLead() {
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
      const response = await fetch(`${BASE_API_URL}/leads`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add data, something went wrong!");
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
      showToast(data.message, "info");
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <Header headerText={"Add New Lead"} />
      <Toasts />
      <main>
        <div className="container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={"/leadList"}>Leads</Link>
              </li>

              <li className="breadcrumb-item active">Add New Lead</li>
            </ol>
          </nav>
          <LeadForm submitFunction={addLead} isEdit={false} />
        </div>
      </main>
    </>
  );
}

export default AddLead;
