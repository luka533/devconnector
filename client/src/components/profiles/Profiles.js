import { BsSearch } from "react-icons/bs";
import { useGetAllProfilesQuery } from "../../state/profiles/profileApiSlice";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

function Profiles() {
  const { data, isLoading } = useGetAllProfilesQuery();

  const profiles = data?.data?.profiles;

  console.log(profiles);

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <BsSearch className="react-icon" />
        Browse and connect with developers
      </p>

      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </>
  );
}

export default Profiles;
