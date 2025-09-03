import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/pageHeader/PageHeader";
import "./showSchools.css";

import SchoolStackIcon from "../../assets/icons/school-stack.svg";
import PlusIcon from "../../assets/icons/plus.svg";

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_BASEURL}/getSchools`);
      setSchools(response.data);
    } catch (e) {
      console.error("Error fetching schools:", e);
      setSchools([]);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="show-schools-container">
      <PageHeader title="Schools" buttonText="+ Add School" onButtonClick={() => navigate("/add")} buttonClassName="action-btn" />

      {schools.length === 0 ? (
        <div className="no-schools">
          <div className="empty-state">
            <div className="empty-icon">
              <img src={SchoolStackIcon} alt="School Stack" />
            </div>
            <h2 className="empty-title">No Schools Found</h2>
            <p className="empty-description">
              It looks like you haven't added any schools yet.
              <br />
              Get started by adding your first school to the system.
            </p>
            <button className="empty-action-btn" onClick={() => navigate("/add")}>
              <img src={PlusIcon} alt="Plus" />
              Add Your First School
            </button>
          </div>
        </div>
      ) : (
        <div className="schools-grid">
          {schools.map((s) => (
            <div key={s.id} className="school-card">
              {s.image && (
                <div className="image-container">
                  <img src={`${import.meta.env.VITE_REACT_BACKEND_BASEURL}/${s.image}`} alt={s.name} />
                </div>
              )}
              <div className="card-content">
                <h3>{s.name}</h3>
                <p className="address">{s.address}</p>
                <p className="city">{s.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
