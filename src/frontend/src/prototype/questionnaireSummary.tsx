import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  hospitals,
  hospitalQuestionnaireData,
  questionTexts,
  hospitalUnits,
} from "./data/mockDataService";
import "./css/prototype.css";

const QuestionnaireSummary: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { formData, editedFields } = location.state || {};

  const { id } = useParams<{ id: string }>();
  const hospitalUnitId = id ? parseInt(id, 10) : null;

  const hospitalUnit = hospitalUnits.find((h) => h.id === hospitalUnitId);
  const hospital = hospitals.find((h) => h.id === hospitalUnit?.hospitalId);
  const data = hospitalQuestionnaireData.find(
    (d) => d.hospitalUnitId === hospitalUnitId
  );

  if (!hospital || !data || !formData || !editedFields) {
    return <div>Hospital not found</div>;
  }

  const handleSave = () => {
    navigate(`/prototype/hospitalList?changesConfirmed=true`);
  };
  const handleCancel = () => {
    navigate(`/prototype/hospitalQuestionnaire/${hospitalUnitId}`);
  };

  const editedEntries = Object.entries(formData).filter(
    ([key]) => editedFields[key]
  ) as [string, string][];
  const nonEditedEntries = Object.entries(formData).filter(
    ([key]) => !editedFields[key]
  ) as [string, string][];

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 className="nhsuk-heading-l">{hospitalUnit?.name}</h1>
            <p>
              <strong>
                {hospital.name} - {hospital.address}
              </strong>
            </p>
            <p>
              <strong>Service category:</strong> {hospitalUnit?.serviceCategory}
            </p>
            <p>
              <strong>Service type:</strong> {hospitalUnit?.serviceType}
            </p>
            <p>Last updated: {data.lastUpdated}</p>
            <p>Updated by: {data.updatedByUserId}</p>

            <div className="nhsuk-back-link">
              <a
                className="nhsuk-back-link__link"
                href={`/prototype/hospitalQuestionnaire/${hospitalUnitId}`}
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

            <h1 className="nhsuk-heading-l">Summary</h1>

            <h2 className="nhsuk-heading-m">Changes / Updates</h2>
            {editedEntries.length > 0 ? (
              <table className="nhsuk-table">
                <tbody>
                  {editedEntries.map(([key, value]) => (
                    <tr key={key}>
                      <td className="nhsuk-table__label">
                        {questionTexts[key as keyof typeof questionTexts]}
                      </td>
                      <td className="nhsuk-table__value">{value}</td>
                      <td className="nhsuk-table__edit">
                        <Link
                          to={`/prototype/hospitalQuestionnaire/${hospitalUnitId}`}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>You have made no changes to the information below.</p>
            )}

            <h2 className="nhsuk-heading-m">No Changes / Updates</h2>
            <table className="nhsuk-table">
              <tbody>
                {nonEditedEntries.map(([key, value]) => (
                  <tr key={key}>
                    <td className="nhsuk-table__label">
                      {" "}
                      {questionTexts[key as keyof typeof questionTexts]}
                    </td>
                    <td className="nhsuk-table__value">{value}</td>
                    <td className="nhsuk-table__edit">
                      <Link
                        to={`/prototype/hospitalQuestionnaire/${hospitalUnitId}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="nhsuk-button-group">
              <button
                className="nhsuk-button"
                type="button"
                onClick={handleSave}
              >
                Save and confirm
              </button>
              <button
                className="nhsuk-button nhsuk-button--secondary nhsuk-u-margin-left-9"
                type="button"
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

export default QuestionnaireSummary;
