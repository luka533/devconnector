import Moment from "react-moment";
import { useDeleteExperienceMutation } from "../../state/profiles/profileApiSlice";

function Experience({ experience }) {
  const [deleteExperienceMutation, { isLoading: isDeletingExp }] =
    useDeleteExperienceMutation();

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment>
        {" - "} {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Now"}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperienceMutation(exp._id)}
          disabled={isDeletingExp}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
}

export default Experience;
