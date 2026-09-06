import Moment from "react-moment";
import { useDeleteEducationMutation } from "../../state/profiles/profileApiSlice";

function Education({ education }) {
  const [deleteEducationMutation, { isLoading: isDeletingEdu }] =
    useDeleteEducationMutation();

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>
        {" - "}{" "}
        {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Now"}{" "}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducationMutation(edu._id)}
          disabled={isDeletingEdu}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
}

export default Education;
