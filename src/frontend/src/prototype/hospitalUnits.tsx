import React from "react";
import { useParams, Link } from "react-router-dom";
import { hospitalUnits, hospitals } from "./data/mockDataService";
import "./css/prototype.css";

const HospitalUnits: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const hospitalId = id ? parseInt(id, 10) : null;

  const hospital = hospitals.find((h) => h.id === hospitalId);
  const units = hospitalUnits.filter((unit) => unit.hospitalId === hospitalId);

  if (!hospital) {
    return <div>Hospital not found</div>;
  }

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 className="nhsuk-heading-l">My Capacity Management</h1>
            <h2 className="nhsuk-heading-m">{hospital.name}</h2>
            <div className="nhsuk-back-link">
              <a
                className="nhsuk-back-link__link"
                href={`/prototype/hospitallist`}
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
            <ul className="nhsuk-list nhsuk-list--border" id="unit-list">
              {units.map((unit) => (
                <li key={unit.id}>
                  <Link
                    className="nhsuk-action-link__link"
                    to={`/prototype/hospitalQuestionnaire/${unit.hospitalId}`}
                  >
                    <span className="nhsuk-action-link__text">{unit.name}</span>
                    <span className="circle-arrow">&gt;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalUnits;
