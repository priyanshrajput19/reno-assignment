import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./showSchools.css";

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/getSchools");
        setSchools(data);
      } catch (e) {
        setSchools([]);
      }
    };
    load();
  }, []);

  return (
    <div className="show-schools-container">
      <div className="header">
        <h1>Schools</h1>
        <button className="add-school-btn" onClick={() => navigate("/add")}>
          Add School
        </button>
      </div>

      {schools.length === 0 ? (
        <div className="no-schools">
          <p>No schools exist</p>
        </div>
      ) : (
        <div className="schools-grid">
          {schools.map((s) => (
            <div key={s.id} className="school-card">
              {s.image && (
                <div className="image-container">
                  <img src={`http://localhost:4000/${s.image}`} alt={s.name} />
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
