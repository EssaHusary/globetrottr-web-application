import React from "react";
import { Link, NavLink, Route, Routes, Navigate } from "react-router-dom";

/* components */
import PrivateLink from "../Components/PrivateLink";
import ReversedPrivateLink from "../Components/ReversedPrivateLink";

/* layouts */
import WithToolbar from "./WithToolbar";

/* pages */
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PagePlaceholder from "../Pages/PagePlaceholder";
import Schedules from "../Pages/Schedules";
import Queries from "../Pages/Queries";
import CreateForm from "../Pages/CreateForm";
import Landing from "../Pages/Landing";
import Profile from "../Pages/Profile";
import AccountInfo from "../Pages/AccountInfo";
import PersonalInfo from "../Pages/PersonalInfo";
import SchedulePref from "../Pages/SchedulePref";
import Results from "../Pages/Results";
import Search from "../Pages/Search";

/**
 * This is the root layout for the entire application. All routes should be added here.
 * Think of it as a blank canvas that you display components/other layouts on (hence the name Canvas.jsx).
 * @returns {ReactNode} The canvas layout
 */

function Canvas() {

  {/**
  * Here's a bad ascii art of how the this is structured:
  * |----------------|
  * | Canvas         |
  * | |------------| |
  * | | Any page   | |
  * | | or layout  | |
  * | |asso'd with | | 
  * | | to         | |
  * | |the route   | |
  * | |            | |
  * | |------------| |
  * |----------------| */
  }

  return (
    <div className="canvas">
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <ReversedPrivateLink children={<Navigate to="landing" />} />
            }
          ></Route>

          <Route
            path="landing"
            element={<ReversedPrivateLink children={<Landing />} />}
          />
          <Route
            path="login"
            element={<ReversedPrivateLink children={<Login />} />}
          />
          <Route
            path="signup"
            element={<ReversedPrivateLink children={<Signup />} />}
          />

          <Route
            path="dashboard"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Dashboard" children={<Schedules />} />
                }
              />
            }
          />
          <Route
            path="search"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Search" children={<Search />} />
                }
              />
            }
          />
          <Route
            path="create/*"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Create" children={<CreateForm />} />
                }
              />
            }
          />
          <Route
            path="create/results"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Results" children={<Results />} />
                }
              />
            }
          />
          <Route
            path="queries"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Queries" children={<Queries />} />
                }
              />
            }
          />
          <Route
            path="profile"
            element={
              <PrivateLink
                children={
                  <WithToolbar title="Profile" children={<Profile />} />
                }
              />
            }
          />
          <Route
            path="profile/accountInfo"
            element={
              <PrivateLink
                children={
                  <WithToolbar
                    title="Account Info"
                    children={<AccountInfo />}
                  />
                }
              />
            }
          />
          <Route
            path="profile/personalInfo"
            element={
              <PrivateLink
                children={
                  <WithToolbar
                    title="Personal Info"
                    children={<PersonalInfo />}
                  />
                }
              />
            }
          />
          <Route
            path="profile/schedulePref"
            element={
              <PrivateLink
                children={
                  <WithToolbar
                    title="Schedule Preferences"
                    children={<SchedulePref />}
                  />
                }
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Canvas;
