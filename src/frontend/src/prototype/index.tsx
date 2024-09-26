import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrototypePage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleContinue = () => {
    const targetPath =
      userId === "admin" ? "/prototype/admin" : "/prototype/hospitalList";
    navigate(targetPath, { state: { userId } });
  };

  return (
    <Fragment>
      <div className="nhsuk-u-padding-top-8">
        <div className="nhsuk-width-container">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h3>Capacity management</h3>

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="userId">
                  User ID
                </label>
                <input
                  className="nhsuk-input"
                  id="userId"
                  name="userId"
                  type="text"
                  value={userId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="nhsuk-input"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
            </div>
          </div>
          <details className="nhsuk-details">
            <summary className="nhsuk-details__summary">
              <span className="nhsuk-details__summary-text">
                What is your user ID login?
              </span>
            </summary>
            <div className="nhsuk-details__text">
              <p>
                To receive your <strong>User ID</strong> you must have validated
                your email address by following the link in the email sent at
                registration.
              </p>
            </div>
          </details>
          <button className="nhsuk-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default PrototypePage;
