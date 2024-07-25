import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/prototype.css";
import { users } from "../data/mockDataService";

const SearchResult: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-back-link">
              <a
                className="nhsuk-back-link__link"
                href="/prototype/admin/manageAccountSearch"
              >
                <svg
                  className="nhsuk-icon nhsuk-icon__chevron-left"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="24"
                  width="24"
                >
                  <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                </svg>
                Go back
              </a>
            </div>
            <h1 className="nhsuk-heading-l">Account search results</h1>
            <p>
              The following names, email addresses and organisation names match
              your search.
            </p>
            <table className="nhsuk-table">
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>Email address</th>
                  <th>Organisation</th>
                  <th>System role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.organisation}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link
                        to={`/prototype/admin/accountPermissions/${user.id}`}
                        className="nhsuk-action-link__link"
                      >
                        <span className="circle-arrow">&gt;</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="searchResultBanner">
              If the name, email address and organisation you are searching for
              is not shown, you can <Link to="#">add a new user</Link> here
            </p>
            <nav
              className="nhsuk-pagination"
              role="navigation"
              aria-label="Pagination"
            >
              <ul className="nhsuk-list nhsuk-pagination__list">
                <li className="nhsuk-pagination-item--previous">
                  <a
                    className="nhsuk-pagination__link nhsuk-pagination__link--prev"
                    href="/prototype"
                  >
                    <span className="nhsuk-pagination__title">Previous</span>
                    <span className="nhsuk-u-visually-hidden">:</span>
                  </a>
                </li>
                <li
                  className={`nhsuk-pagination__item ${
                    currentPage === 1 ? "nhsuk-pagination__item--current" : ""
                  }`}
                >
                  <Link
                    className="nhsuk-pagination__link"
                    to="/prototype/admin/searchresult?page=1"
                    onClick={() => handlePageClick(1)}
                  >
                    <span className="nhsuk-pagination__title">1</span>
                  </Link>
                </li>
                <li
                  className={`nhsuk-pagination__item ${
                    currentPage === 2 ? "nhsuk-pagination__item--current" : ""
                  }`}
                >
                  <Link
                    className="nhsuk-pagination__link"
                    to="/prototype/admin/searchresult?page=2"
                    onClick={() => handlePageClick(2)}
                  >
                    <span className="nhsuk-pagination__title">2</span>
                  </Link>
                </li>
                <li
                  className={`nhsuk-pagination__item ${
                    currentPage === 3 ? "nhsuk-pagination__item--current" : ""
                  }`}
                >
                  <Link
                    className="nhsuk-pagination__link"
                    to="/prototype/admin/searchresult?page=3"
                    onClick={() => handlePageClick(3)}
                  >
                    <span className="nhsuk-pagination__title">3</span>
                  </Link>
                </li>
                <li className="nhsuk-pagination-item--next">
                  <a
                    className="nhsuk-pagination__link nhsuk-pagination__link--next"
                    href="/prototype"
                  >
                    <span className="nhsuk-pagination__title">Next</span>
                    <span className="nhsuk-u-visually-hidden">:</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
