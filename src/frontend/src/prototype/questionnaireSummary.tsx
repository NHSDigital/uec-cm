import React, { useEffect } from "react";
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

  const { userId } = location.state || {};

  const hospitalUnit = hospitalUnits.find((h) => h.id === hospitalUnitId);
  const hospital = hospitals.find((h) => h.id === hospitalUnit?.hospitalId);
  const data = hospitalQuestionnaireData.find(
    (d) => d.hospitalUnitId === hospitalUnitId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hospital || !data || !formData || !editedFields) {
    return <div>Hospital not found</div>;
  }

  const handleSave = () => {
    const hasEdited = editedEntries.length > 0;
    navigate(`/prototype/hospitalList?changesConfirmed=${hasEdited}`, {
      state: { userId },
    });
  };
  // const handleCancel = () => {
  //   navigate(`/prototype/hospitalQuestionnaire/${hospitalUnitId}`, {
  //     state: { formData, editedFields, userId },
  //   });
  // };

  const handleCancel = () => {
    navigate(`/prototype/hospitalList`, {
      state: { userId },
    });
  };

  const handleEditClick = (editKeyId: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default link behavior
    navigate(
      `/prototype/hospitalQuestionnaire/${hospitalUnitId}?editKeyId=${editKeyId}`,
      { state: { formData, editedFields, userId } }
    );
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
            <div className="nhsuk-back-link mb-4">
              <button
                className="nhsuk-back-link__link"
                onClick={() =>
                  navigate(
                    `/prototype/hospitalQuestionnaire/${hospitalUnitId}`,
                    { state: { userId } }
                  )
                }
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
              </button>
            </div>
            <h1 className="nhsuk-heading-l">Check your answers</h1>
            <h2 className="nhsuk-heading-m">
              {hospital.name} - {hospital.street}, {hospital.city},{" "}
              {hospital.postcode}
            </h2>
            <p>
              <strong>Service category:</strong> {hospitalUnit?.serviceCategory}
            </p>
            <p>
              <strong>Service type:</strong> {hospitalUnit?.serviceType}
            </p>
            <p>
              <strong>Last updated:</strong> {data.lastUpdated}
            </p>
            <p>
              <strong>Updated by:</strong> {data.updatedByUserId}
            </p>

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
                          // to={`/prototype/hospitalQuestionnaire/${hospitalUnitId}?editKeyId=${key}`}
                          // state={{ formData, editedFields }}
                          onClick={(event) => handleEditClick(key, event)}
                          to="#"
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
                        // to={`/prototype/hospitalQuestionnaire/${hospitalUnitId}?editKeyId=${key}`}
                        // state={{ formData, editedFields }}
                        onClick={(event) => handleEditClick(key, event)}
                        to="#"
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
                Exit without saving
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireSummary;
