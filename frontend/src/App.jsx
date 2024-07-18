import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobPostPage from "./pages/JobPostPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateJobDetails from "./pages/UpdateJobDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/job-details/:id" element={<JobDetailsPage />} />
        <Route
          path="/job-post"
          element={<ProtectedRoutes Component={JobPostPage} />}
        />
        <Route
          path="/job-update"
          element={<ProtectedRoutes Component={UpdateJobDetails} />}
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
