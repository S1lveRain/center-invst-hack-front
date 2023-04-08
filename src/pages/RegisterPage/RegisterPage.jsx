import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input, Button, Card, Radio, Checkbox, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../../layouts/MainLayout";
import { useSignUpMutation } from "../../app/services/authService";
import { createToken, getToken } from "../../app/slices/authSlice";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный адрес!")
    .required("Обязательное поле!"),
  password: Yup.string().required("Обязательное поле!"),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const select = useSelector(getToken());

  const [isCompany, setIsCompany] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (content) => {
    console.log(content);
    signUp(content)
      .unwrap()
      .then((data) => dispatch(createToken(data)))
      .catch((err) => console.log(err));
  };

  // const {data, error, isLoading} = useGetUsersQuery();
  // console.log(data, error);

  return (
    <MainLayout>
      <div className="login__wrapper">
        <Card className="login__container">
          <h1>Быстрая регистрация</h1>
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
                  touched={touched.email}
                  errors={errors.email}
                  placeholder="email"
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
                  touched={touched.password}
                  errors={errors.password}
                  placeholder="пароль"
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
                  className="login__button"
                  htmlType="submit"
                >
                  Создать аккаунт
                </Button>
              </form>
            )}
          </Formik>
          <p>
            Есть аккаунт? <Link to="/login">Войти!</Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};
