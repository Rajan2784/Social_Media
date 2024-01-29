import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../../components/middlePart/MiddlePart";
import CreateReelsForm from "../../components/reels/CreateReelsForm";
import Reels from "../../components/reels/Reels";
import Profile from "../../components/profile/Profile";
import HomeRight from "../../components/homeRight/HomeRight";
import { useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/auth/auth.action";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, []);

  return (
      <div className="px-20">
        <Grid container spacing={0}>
          <Grid item xs={0} lg={3}>
            <div className="sticky top-0">
              <Sidebar />
            </div>
          </Grid>

          <Grid
            item
            lg={location.pathname === "/" ? 6 : 9}
            className="px-5 flex justify-center"
            xs={12}
          >
            <Routes>
              <Route path="/" element={<MiddlePart />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/create-reels" element={<CreateReelsForm />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </Grid>
          {location.pathname === "/" && (
            <Grid item lg={3} className="relative">
              <div className="sticky top-0 w-full">
                <HomeRight />
              </div>
            </Grid>
          )}
        </Grid>
      </div>
  );
};

export default HomePage;
