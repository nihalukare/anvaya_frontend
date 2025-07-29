import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

import LeadDetails from "../components/LeadDetails";
import CommentSection from "../components/CommentSection";
import Header from "../components/Header";
import SidebarMenu from "../components/SidebarMenu";
import Toasts from "../components/Toasts";

function LeadManagement() {
  const params = useParams();
  const leadId = params.leadId;

  const { data, loading, error } = useFetch(`${BASE_API_URL}/leads/${leadId}`);
  const leadDetails = data?.data;

  return (
    <>
      <Toasts />
      {data?.data ? (
        <Header headerText={`Lead Management: ${leadDetails.name}`} />
      ) : (
        <Header headerText={"Lead Management: Loading..."} />
      )}
      <main>
        <div className="row">
          <div className="col-md-2">
            <SidebarMenu />
          </div>
          <div className="col-md-10">
            <section>
              {error && (
                <div className="alert alert-danger" role="alert">
                  Something went wrong!
                </div>
              )}
              <div className="p-2 mb-3 text-bg-light">
                <LeadDetails leadDetails={leadDetails} loading={loading} />
              </div>

              <div className="p-2 mb-3 text-bg-light">
                <CommentSection author={leadDetails?.salesAgent._id} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default LeadManagement;
