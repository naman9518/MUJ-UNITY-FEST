import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<h1>Home</h1>} />
      </Route>
    </Routes>
  );
}
