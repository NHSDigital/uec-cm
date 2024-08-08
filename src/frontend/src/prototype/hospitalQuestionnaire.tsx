import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  hospitals,
  hospitalQuestionnaireData,
  hospitalUnits,
} from "./data/mockDataService";
import "./css/prototype.css";

type FormData = {
  bedsideStaff: string;
  requiredStaffRatioMeeting: string;
  bedsUnplannedAdmissions: string;
  totalPatients: string;
  ecmoPatients: string;
  invasivelyVentilatedPatients: string;
  nonInvasivelyVentilatedPatients: string;
  bedsOccupiedUnder1Year: string;
  bedsOccupiedBy12To17: string;
  bedsOccupiedBy18Plus: string;
  dischargesOrDeathExpectedNumberIn12Hours: string;
  yesterdaySurgeryCancellations: string;
  yesterdayRefusedUnplannedAdmissions: string;
  notDischargedPatientsForNonClenicalReasons: string;
  patientsOfPimsTs: string;
};

const HospitalQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const hospitalUnitId = id ? parseInt(id, 10) : null;

  const hospitalUnit = hospitalUnits.find((h) => h.id === hospitalUnitId);
  const hospital = hospitals.find((h) => h.id === hospitalUnit?.hospitalId);
  const data = hospitalQuestionnaireData.find(
    (d) => d.hospitalUnitId === hospitalUnitId
  );

  const [formData, setFormData] = useState<FormData>({
    bedsideStaff: data?.bedsideStaff.toString() || "",
    requiredStaffRatioMeeting: data?.requiredStaffRatioMeeting ? "Yes" : "No",
    bedsUnplannedAdmissions: data?.bedsUnplannedAdmissions.toString() || "",
    totalPatients: data?.totalPatients?.toString() || "",
    ecmoPatients: data?.ecmoPatients.toString() || "",
    invasivelyVentilatedPatients:
      data?.invasivelyVentilatedPatients.toString() || "",
    nonInvasivelyVentilatedPatients:
      data?.nonInvasivelyVentilatedPatients?.toString() || "",
    bedsOccupiedUnder1Year: data?.bedsOccupiedUnder1Year?.toString() || "",
    bedsOccupiedBy12To17: data?.bedsOccupiedBy12To17.toString() || "",
    bedsOccupiedBy18Plus: data?.bedsOccupiedBy18Plus.toString() || "",
    dischargesOrDeathExpectedNumberIn12Hours:
      data?.dischargesOrDeathExpectedNumberIn12Hours.toString() || "",
    yesterdaySurgeryCancellations:
      data?.yesterdaySurgeryCancellations.toString() || "",
    yesterdayRefusedUnplannedAdmissions:
      data?.yesterdayRefusedUnplannedAdmissions.toString() || "",
    notDischargedPatientsForNonClenicalReasons:
      data?.notDischargedPatientsForNonClenicalReasons.toString() || "",
    patientsOfPimsTs: data?.patientsOfPimsTs.toString() || "",
  });

  const [initialValues] = useState<FormData>({
    bedsideStaff: data?.bedsideStaff.toString() || "",
    requiredStaffRatioMeeting: data?.requiredStaffRatioMeeting ? "Yes" : "No",
    bedsUnplannedAdmissions: data?.bedsUnplannedAdmissions.toString() || "",
    totalPatients: data?.totalPatients?.toString() || "",
    ecmoPatients: data?.ecmoPatients.toString() || "",
    invasivelyVentilatedPatients:
      data?.invasivelyVentilatedPatients.toString() || "",
    nonInvasivelyVentilatedPatients:
      data?.nonInvasivelyVentilatedPatients?.toString() || "",
    bedsOccupiedUnder1Year: data?.bedsOccupiedUnder1Year?.toString() || "",
    bedsOccupiedBy12To17: data?.bedsOccupiedBy12To17.toString() || "",
    bedsOccupiedBy18Plus: data?.bedsOccupiedBy18Plus.toString() || "",
    dischargesOrDeathExpectedNumberIn12Hours:
      data?.dischargesOrDeathExpectedNumberIn12Hours.toString() || "",
    yesterdaySurgeryCancellations:
      data?.yesterdaySurgeryCancellations.toString() || "",
    yesterdayRefusedUnplannedAdmissions:
      data?.yesterdayRefusedUnplannedAdmissions.toString() || "",
    notDischargedPatientsForNonClenicalReasons:
      data?.notDischargedPatientsForNonClenicalReasons.toString() || "",
    patientsOfPimsTs: data?.patientsOfPimsTs.toString() || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryParams = new URLSearchParams(location.search);
  const editKeyId: string | null = queryParams.get("editKeyId");

  const prevEditedFields = location.state?.editedFields || {};

  useEffect(() => {
    // Highlight and focus the field to edit
    if (editKeyId) {
      const fieldElement = document.getElementById(editKeyId);
      if (fieldElement) {
        fieldElement.focus();
        fieldElement.classList.add("highlight");
      }
    }

    // Scroll to the top if there are errors
    if (Object.keys(errors).length > 0) {
      const summaryElement = document.getElementById("validation-summary");
      if (summaryElement) {
        summaryElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [editKeyId, errors]);

  if (!hospital || !data) {
    return <div>Hospital not found</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.bedsideStaff || isNaN(Number(formData.bedsideStaff))) {
      newErrors.bedsideStaff = "Bed side staff is not valid";
    }
    if (
      !formData.requiredStaffRatioMeeting ||
      (formData.requiredStaffRatioMeeting.toLowerCase() !== "yes" &&
        formData.requiredStaffRatioMeeting.toLowerCase() !== "no")
    ) {
      newErrors.requiredStaffRatioMeeting =
        "Staff ratio meeting enter 'Yes' or 'No'";
    }
    if (
      !formData.bedsUnplannedAdmissions ||
      isNaN(Number(formData.bedsUnplannedAdmissions))
    ) {
      newErrors.bedsUnplannedAdmissions =
        "Beds unplanned admissions is not valid";
    }
    if (!formData.totalPatients || isNaN(Number(formData.totalPatients))) {
      newErrors.totalPatients = "Total patients is not valid";
    }
    if (!formData.ecmoPatients || isNaN(Number(formData.ecmoPatients))) {
      newErrors.ecmoPatients = "ECMO patients is not valid";
    }
    if (
      !formData.invasivelyVentilatedPatients ||
      isNaN(Number(formData.invasivelyVentilatedPatients))
    ) {
      newErrors.invasivelyVentilatedPatients =
        "Invasively ventilated patients is not valid";
    }
    if (
      !formData.nonInvasivelyVentilatedPatients ||
      isNaN(Number(formData.nonInvasivelyVentilatedPatients))
    ) {
      newErrors.nonInvasivelyVentilatedPatients =
        "Non-Invasively ventilated patients is not valid";
    }
    if (
      !formData.bedsOccupiedUnder1Year ||
      isNaN(Number(formData.bedsOccupiedUnder1Year))
    ) {
      newErrors.bedsOccupiedUnder1Year =
        "Beds occupied by under 1 year is not valid";
    }
    if (
      !formData.bedsOccupiedBy12To17 ||
      isNaN(Number(formData.bedsOccupiedBy12To17))
    ) {
      newErrors.bedsOccupiedBy12To17 = "Beds occupied by 12 To 17 is not valid";
    }
    if (
      !formData.bedsOccupiedBy18Plus ||
      isNaN(Number(formData.bedsOccupiedBy18Plus))
    ) {
      newErrors.bedsOccupiedBy18Plus = "Beds occupied by 18 is not valid";
    }
    if (
      !formData.dischargesOrDeathExpectedNumberIn12Hours ||
      isNaN(Number(formData.dischargesOrDeathExpectedNumberIn12Hours))
    ) {
      newErrors.dischargesOrDeathExpectedNumberIn12Hours =
        "Discharges/death expected in 12 hours is not valid";
    }
    if (
      !formData.yesterdaySurgeryCancellations ||
      isNaN(Number(formData.yesterdaySurgeryCancellations))
    ) {
      newErrors.yesterdaySurgeryCancellations =
        "Yesterday surgery cancellations is not valid";
    }
    if (
      !formData.yesterdayRefusedUnplannedAdmissions ||
      isNaN(Number(formData.yesterdayRefusedUnplannedAdmissions))
    ) {
      newErrors.yesterdayRefusedUnplannedAdmissions =
        "Yesterday refused unplanned admissions is not valid";
    }
    if (
      !formData.notDischargedPatientsForNonClenicalReasons ||
      isNaN(Number(formData.notDischargedPatientsForNonClenicalReasons))
    ) {
      newErrors.notDischargedPatientsForNonClenicalReasons =
        "Not discharged patients for non clenical reasons is not valid";
    }
    if (
      !formData.patientsOfPimsTs ||
      isNaN(Number(formData.patientsOfPimsTs))
    ) {
      newErrors.patientsOfPimsTs = "Patients of PIMS-TS is not valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      const changes: Partial<FormData> = { ...prevEditedFields };
      Object.keys(formData).forEach((key) => {
        if (
          formData[key as keyof FormData] !==
          initialValues[key as keyof FormData]
        ) {
          changes[key as keyof FormData] = formData[key as keyof FormData];
        }
      });
      navigate(`/prototype/questionnaireSummary/${hospitalUnitId}`, {
        state: { formData, editedFields: changes },
      });
    }
  };

  const handleCancel = () => {
    navigate(`/prototype/hospitalList`);
  };

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

            {Object.keys(errors).length > 0 && (
              <div
                className="nhsuk-error-summary"
                aria-labelledby="error-summary-title"
                role="alert"
                tabIndex={-1}
                id="validation-summary"
              >
                <h2
                  className="nhsuk-error-summary__title"
                  id="error-summary-title"
                >
                  There is a problem
                </h2>
                <ul className="nhsuk-list nhsuk-error-summary__list">
                  {Object.entries(errors).map(([key, error]) => (
                    <li key={key}>
                      <a href={`#${key}`}>{error}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form className="nhsuk-form">
              <div
                className={`nhsuk-form-group ${
                  errors.bedsideStaff ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="bedsideStaff">
                  Number of bedside staff on shift
                </label>
                {errors.bedsideStaff && (
                  <span className="nhsuk-error-message" id="bedsideStaff-error">
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="bedsideStaff"
                  name="bedsideStaff"
                  type="text"
                  value={formData.bedsideStaff}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.bedsideStaff ? "bedsideStaff-error" : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.requiredStaffRatioMeeting
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="requiredStaffRatioMeeting"
                >
                  Are you meeting required staffing ratios (Yes/No)
                </label>
                {errors.requiredStaffRatioMeeting && (
                  <span
                    className="nhsuk-error-message"
                    id="requiredStaffRatioMeeting-error"
                  >
                    {errors.requiredStaffRatioMeeting}
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="requiredStaffRatioMeeting"
                  name="requiredStaffRatioMeeting"
                  type="text"
                  value={formData.requiredStaffRatioMeeting}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.requiredStaffRatioMeeting
                      ? "requiredStaffRatioMeeting-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.bedsUnplannedAdmissions
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="bedsUnplannedAdmissions"
                >
                  Number of beds available for unplanned admissions
                </label>
                {errors.bedsUnplannedAdmissions && (
                  <span
                    className="nhsuk-error-message"
                    id="bedsUnplannedAdmissions-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="bedsUnplannedAdmissions"
                  name="bedsUnplannedAdmissions"
                  type="text"
                  value={formData.bedsUnplannedAdmissions}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.bedsUnplannedAdmissions
                      ? "bedsUnplannedAdmissions-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.totalPatients ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="totalPatients">
                  Total number of patients on the unit (including
                  planned/accepted admission in the next 12 hours)
                </label>
                {errors.totalPatients && (
                  <span
                    className="nhsuk-error-message"
                    id="totalPatients-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="totalPatients"
                  name="totalPatients"
                  type="text"
                  value={formData.totalPatients}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.totalPatients ? "totalPatients-error" : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.ecmoPatients ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="ecmoPatients">
                  Number of patients supported on ECMO
                </label>
                {errors.ecmoPatients && (
                  <span className="nhsuk-error-message" id="ecmoPatients-error">
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="ecmoPatients"
                  name="ecmoPatients"
                  type="text"
                  value={formData.ecmoPatients}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.ecmoPatients ? "ecmoPatients-error" : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.invasivelyVentilatedPatients
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="invasivelyVentilatedPatients"
                >
                  Number of invasively ventilated patients
                </label>
                {errors.invasivelyVentilatedPatients && (
                  <span
                    className="nhsuk-error-message"
                    id="invasivelyVentilatedPatients-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="invasivelyVentilatedPatients"
                  name="invasivelyVentilatedPatients"
                  type="text"
                  value={formData.invasivelyVentilatedPatients}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.invasivelyVentilatedPatients
                      ? "invasivelyVentilatedPatients-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.nonInvasivelyVentilatedPatients
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="nonInvasivelyVentilatedPatients"
                >
                  Number of non-invasively ventilated patients
                </label>
                {errors.nonInvasivelyVentilatedPatients && (
                  <span
                    className="nhsuk-error-message"
                    id="nonInvasivelyVentilatedPatients-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="nonInvasivelyVentilatedPatients"
                  name="nonInvasivelyVentilatedPatients"
                  type="text"
                  value={formData.nonInvasivelyVentilatedPatients}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.nonInvasivelyVentilatedPatients
                      ? "nonInvasivelyVentilatedPatients-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.bedsOccupiedUnder1Year ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="bedsOccupiedUnder1Year">
                  Number of beds occupied by under 1 year olds
                </label>
                {errors.bedsOccupiedUnder1Year && (
                  <span
                    className="nhsuk-error-message"
                    id="bedsOccupiedUnder1Year-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="bedsOccupiedUnder1Year"
                  name="bedsOccupiedUnder1Year"
                  type="text"
                  value={formData.bedsOccupiedUnder1Year}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.bedsOccupiedUnder1Year
                      ? "bedsOccupiedUnder1Year-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.bedsOccupiedBy12To17 ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="bedsOccupiedBy12To17">
                  Number of beds occupied by 12-17 year olds
                </label>
                {errors.bedsOccupiedBy12To17 && (
                  <span
                    className="nhsuk-error-message"
                    id="bedsOccupiedBy12To17-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="bedsOccupiedBy12To17"
                  name="bedsOccupiedBy12To17"
                  type="text"
                  value={formData.bedsOccupiedBy12To17}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.bedsOccupiedBy12To17
                      ? "bedsOccupiedBy12To17-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.bedsOccupiedBy18Plus ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="bedsOccupiedBy18Plus">
                  Number of beds occupied by 18+ year olds
                </label>
                {errors.bedsOccupiedBy18Plus && (
                  <span
                    className="nhsuk-error-message"
                    id="bedsOccupiedBy18Plus-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="bedsOccupiedBy18Plus"
                  name="bedsOccupiedBy18Plus"
                  type="text"
                  value={formData.bedsOccupiedBy18Plus}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.bedsOccupiedBy18Plus
                      ? "bedsOccupiedBy18Plus-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.dischargesOrDeathExpectedNumberIn12Hours
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="dischargesOrDeathExpectedNumberIn12Hours"
                >
                  Number of discharges/deaths expected in the next 12 hours
                </label>
                {errors.dischargesOrDeathExpectedNumberIn12Hours && (
                  <span
                    className="nhsuk-error-message"
                    id="dischargesOrDeathExpectedNumberIn12Hours-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="dischargesOrDeathExpectedNumberIn12Hours"
                  name="dischargesOrDeathExpectedNumberIn12Hours"
                  type="text"
                  value={formData.dischargesOrDeathExpectedNumberIn12Hours}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.dischargesOrDeathExpectedNumberIn12Hours
                      ? "dischargesOrDeathExpectedNumberIn12Hours-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.yesterdaySurgeryCancellations
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="yesterdaySurgeryCancellations"
                >
                  Number of elective cancellations on the day of surgery
                  yesterday
                </label>
                {errors.yesterdaySurgeryCancellations && (
                  <span
                    className="nhsuk-error-message"
                    id="yesterdaySurgeryCancellations-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="yesterdaySurgeryCancellations"
                  name="yesterdaySurgeryCancellations"
                  type="text"
                  value={formData.yesterdaySurgeryCancellations}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.yesterdaySurgeryCancellations
                      ? "yesterdaySurgeryCancellations-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.yesterdayRefusedUnplannedAdmissions
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="yesterdayRefusedUnplannedAdmissions"
                >
                  Number of refused unplanned admissions yesterday
                </label>
                {errors.yesterdayRefusedUnplannedAdmissions && (
                  <span
                    className="nhsuk-error-message"
                    id="yesterdayRefusedUnplannedAdmissions-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="yesterdayRefusedUnplannedAdmissions"
                  name="yesterdayRefusedUnplannedAdmissions"
                  type="text"
                  value={formData.yesterdayRefusedUnplannedAdmissions}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.yesterdayRefusedUnplannedAdmissions
                      ? "yesterdayRefusedUnplannedAdmissions-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.notDischargedPatientsForNonClenicalReasons
                    ? "nhsuk-form-group--error"
                    : ""
                }`}
              >
                <label
                  className="nhsuk-label"
                  htmlFor="notDischargedPatientsForNonClenicalReasons"
                >
                  Number of patients not discharged yesterday for non-clinical
                  reasons
                </label>
                {errors.notDischargedPatientsForNonClenicalReasons && (
                  <span
                    className="nhsuk-error-message"
                    id="notDischargedPatientsForNonClenicalReasons-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="notDischargedPatientsForNonClenicalReasons"
                  name="notDischargedPatientsForNonClenicalReasons"
                  type="text"
                  value={formData.notDischargedPatientsForNonClenicalReasons}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.notDischargedPatientsForNonClenicalReasons
                      ? "notDischargedPatientsForNonClenicalReasons-error"
                      : undefined
                  }
                />
              </div>

              <div
                className={`nhsuk-form-group ${
                  errors.patientsOfPimsTs ? "nhsuk-form-group--error" : ""
                }`}
              >
                <label className="nhsuk-label" htmlFor="patientsOfPimsTs">
                  Number of patients with a diagnosis (or provisional diagnosis)
                  of PIMS-TS
                </label>
                {errors.patientsOfPimsTs && (
                  <span
                    className="nhsuk-error-message"
                    id="patientsOfPimsTs-error"
                  >
                    Enter a valid numerical number
                  </span>
                )}
                <input
                  className="nhsuk-input"
                  id="patientsOfPimsTs"
                  name="patientsOfPimsTs"
                  type="text"
                  value={formData.patientsOfPimsTs}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.patientsOfPimsTs
                      ? "patientsOfPimsTs-error"
                      : undefined
                  }
                />
              </div>

              <div className="nhsuk-button-group">
                <button
                  className="nhsuk-button"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </button>
                <button
                  className="nhsuk-button nhsuk-button--secondary nhsuk-u-margin-left-9"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalQuestionnaire;
