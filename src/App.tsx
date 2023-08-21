import React, { useEffect, useState } from "react";
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
import { getToken, getUser } from "./app/slices/authSlice";
import { useSelector } from "react-redux";
import { useGetDirectionsQuery } from "./app/services/DirectionApi";
import { useAllTestsQuery, useGetUserQuery } from "./app/services/UserApi";
import { TestsResult } from "./pages/TestsResult/TestsResults";

const App: React.FC = () => {
  const select = useSelector(getToken());
  const userId = useSelector(getUser());
   
  const [isUser, setIsUser] = useState(true)
  const [skip, setSkip] = useState(true)
  const { data: currentUser } = useGetUserQuery(userId as string);
  const { data: direction, isLoading, isError } = useGetDirectionsQuery('', {
    skip: isUser
  });
  const { data: userTests, isLoading: userTestsLoading, isError: userTestsError } = useAllTestsQuery('',{
    skip
  });

 
  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      setIsUser(false)
    } 
    if (currentUser && currentUser.role === 'user') {
      setSkip(false)
    }
  }, [currentUser])


  if (select)
    if (!isUser)
      return (
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/" element={<HelloMessage />} /> */}
          <Route
            path="/vacancy/:id"
            element={<VacancyWindow data={direction} withNav={true} />}
          />
          <Route path="/selectVacancy/:id" element={<SelectVacancy />} />
          <Route path="/quiz/:id" element={<VacancyQuiz />} />
          <Route path="/" element={<TestsResult data={direction} isLoading = {isLoading} isError = {isError} />} />
        </Routes>
      );
    else
      return (
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route
            path="/"
            element={<HelloMessage isPlainUser user={currentUser} />}
          /> */}
          <Route path="/" element={<TestsResult data={userTests} isPlainUser isLoading = {userTestsLoading} isError = {userTestsError}/>} />
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
