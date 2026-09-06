import { FaRegUser } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";

import { useSelector } from "react-redux";
import {
  useDeleteProfileMutation,
  useGetCurrentProfileQuery,
} from "../../state/profiles/profileApiSlice";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

function Dashboard() {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth,
  );

  const { data, error } = useGetCurrentProfileQuery(undefined, {
    skip: !isAuthenticated || isLoading,
  });

  console.log(data);

  const profile = data?.data?.profile ?? null;

  const [deleteProfileMutation, { isLoading: isDeletingProfile }] =
    useDeleteProfileMutation();

  if (!isAuthenticated || isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Unable to load profile.</div>;
  }

  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <FaRegUser className="react-icon" />
        Welcome {user && user.name}
      </p>
      {!profile && !isLoading ? (
        <>
          <p>You have not setup a profile! Please go to: </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn bnt-danger" onClick={deleteProfileMutation}>
              <AiOutlineUserDelete className="react-icon-danger" /> Delete My
              Account
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
