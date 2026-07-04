import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("../pages/MainPage"));

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  )
}