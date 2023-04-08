import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import { useSignInMutation } from "../../services/authService";
// import { createToken, getToken } from "../../services/tokenService";

import { Input, Button, Card, Alert } from "antd";
import "./login.css";
import { Layout } from "antd";
import { MainLayout } from "../../layouts/MainLayout";
import { Nav } from "../../layouts/Nav";
import { data } from "../../app/dataExample";
import { useSignInMutation } from "../../app/services/authService";
import { createToken, getToken } from "../../app/slices/authSlice";
const { Header, Footer, Sider, Content } = Layout;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный адрес!")
    .required("Обязательное поле!"),
  password: Yup.string().required("Обязательное поле!"),
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();
  const select = useSelector(getToken());

  console.log(select);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (content) => {
    console.log("uiu3");
    console.log(content);
    signIn(content)
      .unwrap()
      .then((data) => dispatch(createToken(data)));
    //  .catch(({ data: { message } }) => toast.error(message));
  };

  // const {data, error, isLoading} = useGetUsersQuery();
  // console.log(data, error);

  return (
    <MainLayout>
      <div className="login__wrapper">
        <Card className="login__container">
          <h1 style={{ margin: "0 0 15px 0", textAlign: "center" }}>Вход</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  className="login__input"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ margin: 0 }}
                />
                {errors.email && touched.email && (
                  <Alert
                    message={errors.email}
                    type="error"
                    showIcon
                    style={{ margin: 10 }}
                  />
                )}

                <Input
                  className="login__input"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ margin: "10px 0 0 0" }}
                />
                {errors.password && touched.password && (
                  <Alert
                    message={errors.password}
                    type="error"
                    showIcon
                    style={{ margin: 10 }}
                  />
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login__button"
                >
                  Войти
                </Button>
              </form>
            )}
          </Formik>
          <p>
            Нет аккаунта? <Link to="/register">Создать аккаунт!</Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};
