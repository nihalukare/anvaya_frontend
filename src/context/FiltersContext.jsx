import { useContext, useState } from "react";
import { createContext } from "react";

const FiltersContext = createContext();

export const useFiltersContext = () => useContext(FiltersContext);

export function FiltersProvider({ children }) {
  const [leadsAPIUrl, setLeadsAPIUrl] = useState();
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [status, setStatus] = useState("All");
  const [timeToClose, setTimeToClose] = useState("");

  return (
    <FiltersContext.Provider
      value={{
        leadsAPIUrl,
        setLeadsAPIUrl,
        filteredLeads,
        setFilteredLeads,
        timeToClose,
        setTimeToClose,
        status,
        setStatus,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
