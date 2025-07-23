export default function Pagination({ noOfPages, currentPage, setCurrentPage }) {
  return (
    <>
      {noOfPages > 1 ? (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage < 1 ? " disabled" : ""}`}>
              <button
                className="page-link"
                aria-label="previous"
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                }}
              >
                <span>&laquo;</span>
              </button>
            </li>
            {[...Array(noOfPages).keys()].map((n) => (
              <li
                key={n}
                className={`page-item ${currentPage === n ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(n)}>
                  <span>{n + 1}</span>
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage > noOfPages - 2 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                aria-label="next"
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                }}
              >
                <span>&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}
