import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddSchoolPage from "./pages/addSchool.jsx";
import ShowSchoolsPage from "./pages/showSchools.jsx";

function App() {
  return (
    <>
      <div className="bg-zinc-800 h-dvh">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowSchoolsPage />} />
            <Route path="/add" element={<AddSchoolPage />} />
            <Route path="/schools" element={<ShowSchoolsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
