import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddEducationMutation } from "../../state/profiles/profileApiSlice";
import { removeAlert, setAlert } from "../../state/alert/alertSlice";
import { useDispatch } from "react-redux";

function AddEducation() {
  const [formData, setformData] = useState({
    degree: "",
    school: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const { degree, fieldofstudy, school, from, current, to, description } =
    formData;

  // "to" field should be disabled if "current" field is true
  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addEducationMutation, { isLoading: isAddingEducation }] =
    useAddEducationMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    addEducationMutation(formData);
    navigate("/dashboard");
  };

  return (
    <>
      <h1 class="large text-primary">Add Your Education</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or bootcamp"
            name="school"
            required
            value={school}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or certificate"
            name="degree"
            required
            value={degree}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="field of study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={onChange} value={from} />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setformData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Program
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={toDateDisabled ? "disabled" : ""}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input
          type="submit"
          class="btn btn-primary my-1"
          disabled={isAddingEducation}
        />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
}

export default AddEducation;
