import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegArrowAltCircleDown, FaGraduationCap } from "react-icons/fa";

function DashboardActions() {
  return (
    <div class="dash-buttons">
      <Link to="/edit-profile" class="btn btn-light">
        <FaCircleUser className="react-icon-primary" /> Edit Profile
      </Link>
      <Link to="/add-experience" class="btn btn-light">
        <FaRegArrowAltCircleDown className="react-icon-primary" /> Add
        Experience
      </Link>
      <Link to="/add-education" class="btn btn-light">
        <FaGraduationCap className="react-icon-primary" /> Add Education
      </Link>
    </div>
  );
}

export default DashboardActions;
