import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
      <h1>This is footer</h1>
    </>
  );
};
