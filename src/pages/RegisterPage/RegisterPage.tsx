import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Button, Card, Alert, theme, Steps, message, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../../layouts/MainLayout";
import { useSignUpMutation } from "../../app/services/AuthApi";
import { createToken, getToken } from "../../app/slices/authSlice";
import { Formik } from "formik";
import './register.css'
import { firstStepFields, secondStepFields, thirdStepFields, steps } from './constants'
import { isNextStepAvailable } from './utils'


const phoneRegExp = /((8|\+7)-?)?\(?\d{3}\)?-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}/
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный адрес!")
    .required("Обязательное поле!"),
  password: Yup.string().required("Обязательное поле!"),
  city: Yup.string().required("Обязательное поле!"),
  phoneNumber: Yup.string()
    .required("Обязательное поле!")
    .matches(phoneRegExp, 'Недействительный номер')
    .min(11, 'Слишком короткий')
    .max(12, 'Слишком длинный'),
  firstName: Yup.string().required("Обязательное поле!"),
  patronymic: Yup.string().required("Обязательное поле!"),
  lastName: Yup.string().required("Обязательное поле!"),
  age: Yup.number().required("Обязательное поле!"),
  schoolName: Yup.string().required("Обязательное поле!"),
  classNumber: Yup.number().required("Обязательное поле!").max(11, 'Неверный класс').min(1, 'Неверный класс'),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const select = useSelector(getToken());

  const initialValues = {
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    firstName: "",
    patronymic: "",
    lastName: "",
    age: "",
    schoolName: "",
    classNumber: "",
  };


  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));




  const handleSubmit = async (content: any) => {
    console.log(content);
    signUp(content)
      .unwrap()
      .then((data) => {
        dispatch(createToken(data) as any)
        message.success('Успешная регистрация!')
      })
      .catch((err) => console.log(err));
  };

  // const {data, error, isLoading} = useGetUsersQuery();
  // console.log(data, error);

  return (
    <MainLayout>
      <div className="register__wrapper">
        <Card className="register__container">
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

                <Steps current={current}  items={items} />
                <div style={{ marginTop: 24 }}>
                  <>
                    {
                      current === 0 &&

                      <>
                        {
                          firstStepFields.map((item) => {
                            return (
                              <div key={item.name + item.type}>
                                <Input
                                  className="register__input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type={item.type}
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  value={values[item.name as keyof typeof values]}
                                  status = {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
                                />
                                {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] && (
                                  <Alert
                                    message={errors[item.name as keyof typeof errors]}
                                    type="error"
                                    showIcon
                                    style={{ marginBottom: 10 }}
                                  />
                                )}
                              </div>
                            )
                          })
                        }

                      </>
                    }
                  </>
                  <>
                    {
                      current === 1 &&
                      <>
                        {
                          secondStepFields.map((item) => {
                            return (
                              <div key={item.name + item.type}>
                                <Input
                                  className="register__input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type={item.type}
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  value={values[item.name as keyof typeof values]}
                                  status = {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
                                />
                                {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] && (
                                  <Alert
                                    message={errors[item.name as keyof typeof errors]}
                                    type="error"
                                    showIcon
                                    style={{ marginBottom: 10 }}
                                  />
                                )}
                              </div>
                            )
                          })
                        }
                      </>
                    }

                    <>
                      {
                        current === 2 &&
                        <>
                          {
                            thirdStepFields.map((item) => {
                              return (
                                <div key={item.name + item.type}>
                                  <Input
                                    className="register__input"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type={item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    value={values[item.name as keyof typeof values]}
                                    status = {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
                                  />
                                  {errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] && (
                                    <Alert
                                      message={errors[item.name as keyof typeof errors]}
                                      type="error"
                                      showIcon
                                      style={{ marginBottom: 10 }}
                                    />
                                  )}
                                </div>
                              )
                            })
                          }
                        </>
                      }
                    </>
                  </>

                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                      Далее
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary"
                      disabled={isNextStepAvailable(
                        [
                          errors.age,
                          errors.city,
                          errors.classNumber,
                          errors.email,
                          errors.firstName,
                          errors.lastName,
                          errors.patronymic,
                          errors.phoneNumber,
                          errors.schoolName,
                        ]
                      )}
                      className="register__button"
                      htmlType="submit"
                      >
                      Перейти к тестированию
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Назад
                    </Button>
                  )}
                </div>
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
