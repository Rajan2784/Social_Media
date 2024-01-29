import { Card } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <div className="bg flex items-center justify-center w-full h-[100vh]">
      <Card className="w-[400px] p-5 ">
        <div>
          <div>
            <h1 className="logo text-center">Social Platform</h1>
          </div>
          <div>
            <p className="text-sm w-[70] text-center">
              Connecting Peoples together❤️❤️.
            </p>
          </div>
        </div>

        <div className="mt-5">
            <Routes>
            <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </div>
      </Card>
    </div>
  );
};

export default Authentication;
