import React from "react";
import { Link } from "react-router-dom";
import "../css/prototype.css";

const AdminLandingPage: React.FC = () => {
  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-back-link">
              <a className="nhsuk-back-link__link" href="/prototype">
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
            <h1 className="nhsuk-heading-l">Good morning, Marc Sutton</h1>
            <h3 className="nhsuk-u-margin-bottom-4">Available services</h3>
            <ul className="nhsuk-list nhsuk-list--border services-list">
              <li>
                <Link
                  className="nhsuk-action-link__link"
                  to="/prototype/admin/manageAccountSearch"
                >
                  <span className="nhsuk-action-link__text">
                    Manage user accounts
                  </span>
                  <span className="arrow">&gt;</span>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  className="nhsuk-action-link__link"
                  to="/prototype/admin/manageAccountSearch"
                >
                  <span className="nhsuk-action-link__text">
                    Add a new user account
                  </span>
                  <span className="arrow">&gt;</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
