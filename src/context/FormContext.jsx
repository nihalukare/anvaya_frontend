import { createContext, useContext } from "react";
import { useState } from "react";

const FormContext = createContext();

const useForm = () => useContext(FormContext);
export default useForm;

export function FormProvider({ children }) {
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <FormContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
