import { useDispatch, useSelector } from "react-redux";
import { removeAlert, setAlert } from "../../state/alert/alertSlice";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authRegisterAsync } from "../../state/auth/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    const id = crypto.randomUUID();
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(
        setAlert({ msg: "Passwords do not match!", type: "danger", id }),
      );
      setTimeout(() => dispatch(removeAlert(id)), 5000);
    } else {
      console.log("MATCH");
      dispatch(authRegisterAsync({ name, email, password, passwordConfirm }));
      setTimeout(() => dispatch(removeAlert(id)), 5000);

      // dispatch(
      //   setAlert({ msg: "Passwords do not match!", type: "danger", id }),
      // );
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="6"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
}

export default Register;
