import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { TestPage } from "./pages/TestPage/TestPage";
import { data, vacancyList } from "./app/dataExample";
import { SelectVacancy } from "./pages/SelectVacancy/SelectVacancy";
import { VacancyWindow } from "./pages/VacancyWindow/VacancyWindow";
import { VacancyQuiz } from "./pages/VacancyQuiz/VacancyQuiz";
import { HelloMessage } from "./pages/HelloMessage/HelloMessage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { getToken } from "./app/slices/authSlice";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const select = useSelector(getToken());
  console.log("select");
  console.log(select);
  if (select)
    return (
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HelloMessage />} />
        <Route path="/vacancy/:id" element={<VacancyWindow data={data} />} />
        <Route path="/selectVacancy" element={<SelectVacancy />} />
        <Route path="/quiz/:id" element={<VacancyQuiz />} />
      </Routes>
    );
  else
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
};

export default App;
