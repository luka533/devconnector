import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "./state/auth/authSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import ProtectedRoute from "./components/ProtectedRoute";
import Post from "./components/post/Post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  return (
    // <Provider store={store}>
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>

        <section className="container">
          <Alert />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profiles" element={<Profiles />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/add-experience" element={<AddExperience />} />
              <Route path="/add-education" element={<AddEducation />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:postId" element={<Post />} />
            </Route>
          </Routes>
        </section>
      </>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
