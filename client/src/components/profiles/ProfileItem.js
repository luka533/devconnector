import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProfileItem({ profile: { user, status, company, location, skills } }) {
  const { _id, name, avatar } = user || {};

  return (
    <div className="profile bg-light">
      <img src={avatar} alt={`Image of ${name}`} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, i) => (
          <li key={i} className="text-primary">
            <BsCheck className="react-icon" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileItem;
