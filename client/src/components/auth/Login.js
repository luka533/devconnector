import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { authLoginAsync } from "../../state/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();

  // after successful login (in effect or after dispatch resolves):
  const from = location.state?.from?.pathname || "/dashboard";
  // useEffect(() => {
  //   // we replace the current /login route so if the user want to go back he will hit the route before /login
  //   // as the name says the current route is replaced by the new one for better UX
  //   if (isAuthenticated) navigate(from, { replace: true });
  // }, [isAuthenticated, navigate, from]);

  if (isAuthenticated) return <Navigate to={from} replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(authLoginAsync({ email, password }));
  };

  return (
    <>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
}

export default Login;
