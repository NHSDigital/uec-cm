import React from "react";
// import { Link } from "react-router-dom";
import "../css/prototype.css";

const ManageAccountSearch: React.FC = () => {
  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-back-link">
              <a className="nhsuk-back-link__link" href="/prototype/admin">
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
            <h1 className="nhsuk-heading-l">Account search</h1>
            <p>
              Search by <strong>either</strong> name, email address or
              organisation name.
            </p>
            <form action="/prototype/admin/searchresult" method="get">
              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="search">
                  Search
                </label>
                <input
                  className="nhsuk-input"
                  id="search"
                  name="search"
                  type="text"
                />
              </div>
              <button type="submit" className="nhsuk-button">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountSearch;
