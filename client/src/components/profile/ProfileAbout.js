import { BsCheck } from "react-icons/bs";

function ProfileAbout({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <>
          {" "}
          <h2 class="text-primary">{name.trim().split(" ")[0]}s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
        </>
      )}

      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {skills.map((skill, i) => (
          <div key={i} class="p-1">
            <BsCheck className="react-icon" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileAbout;
