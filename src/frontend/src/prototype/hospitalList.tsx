import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/prototype.css";
import { hospitals, hospitalUnits } from "./data/mockDataService";

const HospitalList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const changesConfirmed = queryParams.get("changesConfirmed");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userId) {
      navigate("/prototype/hospitallist", { state: { userId } });
    }
  }, [userId, navigate, location.pathname]);

  // Function to navigate to the correct page based on the number of units test
  const handleHospitalClick = (hospitalId: number, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default link behavior

    const units = hospitalUnits.filter(
      (unit) => unit.hospitalId === hospitalId
    );

    if (units.length === 1) {
      navigate(`/prototype/hospitalQuestionnaire/${units[0].id}`, {
        state: { userId },
      });
    } else {
      navigate(`/prototype/hospitalUnits/${hospitalId}`, { state: { userId } });
    }
  };

  console.log("this is hospital list");
  console.log(userId);

  // Filter hospitals based on userId
  const displayedHospitals =
    userId === "user 1" ? [hospitals[0], hospitals[3]] : hospitals;

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        {changesConfirmed && (
          <div
            className="nhsuk-do-dont-list"
            style={{
              borderColor: "#007f3b",
              backgroundColor: "#fff",
            }}
          >
            <h3 className="nhsuk-do-dont-list__label nhsuk-do-dont-list__label--do">
              Done
            </h3>
            <div className="nhsuk-do-dont-list__content">
              <span className="nhsuk-u-visually-hidden">Confirmation: </span>
              {changesConfirmed === "true" ? (
                <p>You have successfully saved and confirmed your updates.</p>
              ) : (
                <p>
                  You have made no updates and confirmed the data is correct.
                </p>
              )}
            </div>
          </div>
        )}
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 className="nhsuk-heading-l">My Capacity Management</h1>
            <h2 className="nhsuk-heading-m">My locations</h2>
            <ul className="nhsuk-list nhsuk-list--border" id="hospital-list">
              {displayedHospitals.map((hospital) => (
                <li key={hospital.id}>
                  <Link
                    className="nhsuk-action-link__link"
                    to="#"
                    onClick={(event) => handleHospitalClick(hospital.id, event)}
                  >
                    <span className="nhsuk-action-link__text">
                      {hospital.name}
                    </span>
                    <span className="circle-arrow">&gt;</span>
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="nhsuk-heading-m">Reports</h2>
            <p>
              You can download a report of all the capacity management
              information you have access to via this link.
            </p>
            <button className="nhsuk-button">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
