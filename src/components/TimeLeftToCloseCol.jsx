export default function TimeLeftToCloseCol({ lead }) {
  return (
    <>
      {lead.status === "Closed" ? (
        "Closed"
      ) : (
        <span
          className={
            Math.ceil(lead.timeLeftToClose / 86400000) < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {Math.ceil(lead.timeLeftToClose / 86400000) < 0
            ? `Lead overdue by ${Math.abs(
                Math.ceil(lead.timeLeftToClose / 86400000)
              )} ${
                Math.abs(Math.ceil(lead.timeLeftToClose / 86400000)) > 1
                  ? "days"
                  : "day"
              }`
            : `${Math.ceil(lead.timeLeftToClose / 86400000)} ${
                Math.ceil(lead.timeLeftToClose / 86400000) > 1 ? "days" : "day"
              }`}
        </span>
      )}
    </>
  );
}
