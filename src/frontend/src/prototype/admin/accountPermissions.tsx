import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../css/prototype.css";
import { users } from "../data/mockDataService";

const AccountPermissions: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : null;
  const user = users.find((h) => h.id === userId);
  const handleCancel = () => {
    navigate(`/prototype/hospitalList`);
  };

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-back-link">
              <a
                className="nhsuk-back-link__link"
                href="/prototype/admin/searchResult"
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
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-three-quarters">
                <h1>{user?.name}</h1>
              </div>
              <div className="nhsuk-grid-column-one-quarter">
                <Link
                  to="/delete-account"
                  className="nhsuk-link nhsuk-link--no-visited-state"
                >
                  Delete account
                </Link>
              </div>
            </div>
            <p>Last updated: 30 May 2024 08:45:26</p>
            <p>Updated by: Marc Sutton</p>
            <dl className="nhsuk-summary-list">
              <div className="nhsuk-summary-list__row">
                <dt className="nhsuk-summary-list__key">Full name</dt>
                <dd className="nhsuk-summary-list__value">{user?.name}</dd>
              </div>
              <div className="nhsuk-summary-list__row">
                <dt className="nhsuk-summary-list__key">Email</dt>
                <dd className="nhsuk-summary-list__value">{user?.email}</dd>
              </div>
              <div className="nhsuk-summary-list__row">
                <dt className="nhsuk-summary-list__key">Organisation</dt>
                <dd className="nhsuk-summary-list__value">
                  {user?.organisation}
                </dd>
              </div>
              <div className="nhsuk-summary-list__row">
                <dt className="nhsuk-summary-list__key">Role</dt>
                <dd className="nhsuk-summary-list__value">{user?.role}</dd>
              </div>
            </dl>
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-one-third">
                <div className="nhsuk-form-group">
                  <label className="nhsuk-label" htmlFor="permissions">
                    Permissions
                  </label>
                </div>
              </div>
              <div className="nhsuk-grid-column-one-third">
                <details className="nhsuk-details">
                  <summary className="nhsuk-details__summary">
                    <span className="nhsuk-details__summary-text">
                      Permissions information
                    </span>
                  </summary>
                  <div className="nhsuk-details__text">
                    <strong>Data Inputter</strong>
                    <ul>
                      <li>Respond to and save changes for questionnaires</li>
                    </ul>

                    <strong>Questionnaire / Summary Data Viewer</strong>
                    <p>As Data Inputter, plus:</p>
                    <ul>
                      <li>Search for and view summary questionnaire data</li>
                      <li>Download questionnaire reports</li>
                    </ul>

                    <strong>User Administrator</strong>
                    <p>As Questionnaire / Summary Data Viewer, plus:</p>
                    <ul>
                      <li>Accept and reject new user requests</li>
                      <li>Manage user permissions</li>
                    </ul>

                    <strong>Questionnaire Manager</strong>
                    <p>As User Administrator, plus:</p>
                    <ul>
                      <li>Create new questionnaires</li>
                      <li>Update existing questionnaires</li>
                      <li>
                        Cascade changes to services linked to questionnaires
                      </li>
                    </ul>

                    <strong>Data Manager</strong>
                    <p>As Questionnaire Manager, plus:</p>
                    <ul>
                      <li>Search, edit, and add organisation records</li>
                      <li>Search, edit, and add location records</li>
                      <li>Search, edit and add service records</li>
                      <li>Link questionnaires to service records</li>
                    </ul>

                    <strong>Administrator</strong>
                    <p>As Data Manager, plus no data restrictions</p>
                  </div>
                </details>
                <div className="nhsuk-radios">
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="dataInputter"
                      name="permissions"
                      type="radio"
                      value="dataInputter"
                      defaultChecked
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="dataInputter"
                    >
                      Data Inputter
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="questionnaireSummaryDataViewer"
                      name="permissions"
                      type="radio"
                      value="questionnaireSummaryDataViewer"
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="questionnaireSummaryDataViewer"
                    >
                      Questionnaire / Summary Data Viewer
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="userAdministrator"
                      name="permissions"
                      type="radio"
                      value="userAdministrator"
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="userAdministrator"
                    >
                      User Administrator
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="questionnaireManager"
                      name="permissions"
                      type="radio"
                      value="questionnaireManager"
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="questionnaireManager"
                    >
                      Questionnaire Manager
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="dataManager"
                      name="permissions"
                      type="radio"
                      value="dataManager"
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="dataManager"
                    >
                      Data Manager
                    </label>
                  </div>
                  <div className="nhsuk-radios__item">
                    <input
                      className="nhsuk-radios__input"
                      id="administrator"
                      name="permissions"
                      type="radio"
                      value="administrator"
                    />
                    <label
                      className="nhsuk-label nhsuk-radios__label"
                      htmlFor="administrator"
                    >
                      Administrator
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="nhsuk-button-group">
              <button type="submit" className="nhsuk-button">
                Save
              </button>
              <button
                type="button"
                className="nhsuk-button nhsuk-button--secondary "
                style={{ marginLeft: "40px" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPermissions;
