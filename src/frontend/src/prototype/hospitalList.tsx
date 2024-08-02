import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import "./css/prototype.css";
import { hospitals, hospitalUnits } from "./data/mockDataService";

const HospitalList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changesConfirmed = queryParams.get("changesConfirmed");
  // const generatePDF = () => {
  //   const input = document.getElementById("hospital-list");
  //   if (input) {
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF();
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //       pdf.save("hospital-list.pdf");
  //     });
  //   }
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to check if a hospital has only one unit
  const getHospitalLink = (hospitalId: number) => {
    const units = hospitalUnits.filter(
      (unit) => unit.hospitalId === hospitalId
    );
    if (units.length === 1) {
      return `/prototype/hospitalQuestionnaire/${units[0].id}`;
    } else {
      return `/prototype/hospitalUnits/${hospitalId}`;
    }
  };

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        {changesConfirmed && (
          <div
            className="nhsuk-inset-text"
            style={{
              borderColor: "#007f3b", // NHS green color
              backgroundColor: "#fff",
            }}
          >
            <span className="nhsuk-u-visually-hidden">Confirmation: </span>
            {changesConfirmed === "true" ? (
              <p>You have successfully saved and confirmed your updates.</p>
            ) : (
              <p>You have made no updates and confirmed the data is correct.</p>
            )}
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
                    to={getHospitalLink(hospital.id)}
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
            {/* <button onClick={generatePDF} className="nhsuk-button">
              Download Report
            </button> */}
            <button className="nhsuk-button">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
