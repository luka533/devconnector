import Moment from "react-moment";

function ProfileExperience({
  experience: { company, title, location, from, to, current, description },
}) {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
}

export default ProfileExperience;
