import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

export default function SidebarMenu() {
  return (
    <section className="h-100">
      <div className="text-bg-light h-100 min-vh-100">
        <h2 className="text-body-secondary px-3 py-2">Sidebar</h2>
        {document.location.pathname !== "/" && (
          <div className="px-3 pb-3">
            <Link to={"/"} className="link-underline link-underline-opacity-0">
              <FontAwesomeIcon icon={faBackward} /> Back to Dashboard
            </Link>
          </div>
        )}

        <ul className="nav-pills list-group list-group-flush px-3 pb-3">
          <li className="list-group-item nav-item p-0">
            <Link
              to={"/"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/" && "active"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="list-group-item nav-item p-0">
            <Link
              to={"/leadList"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/leadList" && "active"
              }`}
            >
              Leads
            </Link>
          </li>

          <li className="list-group-item nav-item p-0">
            <Link
              to={"/salesAgentManagement"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/salesAgentManagement" &&
                "active"
              }`}
            >
              Agents
            </Link>
          </li>
          <li className="list-group-item nav-item p-0">
            <Link
              to={"/reports"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/reports" && "active"
              }`}
            >
              Reports
            </Link>
          </li>
          <li className="list-group-item nav-item p-0">
            <Link
              to={"/leadsByStatus"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/leadsByStatus" && "active"
              }`}
            >
              Leads by Status
            </Link>
          </li>
          <li className="list-group-item nav-item p-0">
            <Link
              to={"/leadsBySalesAgent"}
              className={`nav-link rounded-0 px-3 py-2 ${
                document.location.pathname === "/leadsBySalesAgent" && "active"
              }`}
            >
              Leads by Sales Agent
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
