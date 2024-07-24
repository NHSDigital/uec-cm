import React from "react";
import { useParams } from "react-router-dom";
import { hospitals } from "./data/mockDataService";

const HospitalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const hospitalId = id ? parseInt(id, 10) : null;
  const hospital = hospitals.find((h) => h.id === hospitalId);

  return (
    <div className="nhsuk-u-padding-top-8">
      <div className="nhsuk-width-container">
        <h1>Hospital Detail</h1>
        {hospital ? <p>{hospital.name}</p> : <p>Hospital not found</p>}
      </div>
    </div>
  );
};

export default HospitalDetail;
