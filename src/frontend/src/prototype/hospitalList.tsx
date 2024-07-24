import React from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./css/prototype.css";
import { hospitals } from "./data/mockDataService";

const HospitalList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showConfirmation = queryParams.get("changesConfirmed") === "true";
  const generatePDF = () => {
    const input = document.getElementById("hospital-list");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("hospital-list.pdf");
      });
    }
  };

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        {showConfirmation && (
          <div
            className="nhsuk-inset-text"
            style={{
              borderColor: "#007f3b", // NHS green color
              backgroundColor: "#fff",
            }}
          >
            <span className="nhsuk-u-visually-hidden">Confirmation: </span>
            <p>You have successfully saved and confirmed your updates.</p>
          </div>
        )}
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 className="nhsuk-heading-l">My Capacity Management</h1>
            <h2 className="nhsuk-heading-m">My locations</h2>
            <ul className="nhsuk-list nhsuk-list--border" id="hospital-list">
              {hospitals.map((hospital) => (
                <li key={hospital.id}>
                  <Link
                    className="nhsuk-action-link__link"
                    // to={`/prototype/hospitalQuestionnaire/${hospital.id}`}
                    to={`/prototype/hospitalUnits/${hospital.id}`}
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
            <button onClick={generatePDF} className="nhsuk-button">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
