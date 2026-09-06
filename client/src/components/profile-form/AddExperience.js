import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddExperienceMutation } from "../../state/profiles/profileApiSlice";

function AddExperience() {
  const [formData, setformData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const { title, company, location, from, current, to, description } = formData;

  // "to" field should be disabled if "current" field is true
  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const [addExperienceMutation, { isLoading: isAddingExperience }] =
    useAddExperienceMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    addExperienceMutation(formData);

    navigate("/dashboard");
  };

  return (
    <>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input
          type="submit"
          class="btn btn-primary my-1"
          disabled={isAddingExperience}
        />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
}

export default AddExperience;
