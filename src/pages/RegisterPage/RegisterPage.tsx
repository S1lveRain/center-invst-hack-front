import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button, Card, Alert, theme, Steps, message, Input } from "antd";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/MainLayout";
import { useSignUpMutation } from "../../app/services/AuthApi";
import { createToken } from "../../app/slices/authSlice";
import { Formik } from "formik";
import './register.css'
import { firstStepFields, secondStepFields, thirdStepFields, steps, phoneRegExp } from './constants'
import { isSubmitBtnAvailable } from './utils'
import { useUpdateUserMutation } from "../../app/services/UserApi";




const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный адрес!")
    .required("Обязательное поле!"),
  password: Yup.string().required("Обязательное поле!"),
  locality: Yup.string().required("Обязательное поле!"),
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
  schoolClass: Yup.number().required("Обязательное поле!").max(11, 'Неверный класс').min(1, 'Неверный класс'),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [signUp] = useSignUpMutation();
  const [updateUser] = useUpdateUserMutation()

  const initialValues = {
    email: '',
    password: '',
    phoneNumber: "",
    locality: "",
    firstName: "",
    patronymic: "",
    lastName: "",
    age: "",
    schoolName: "",
    schoolClass: "",
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
    let userId = ''
    signUp({
      email: content.email,
      password: content.password
    })
      .unwrap()
      .then((data) => {
        dispatch(createToken(data) as any)
        message.success('Пользователь успешно создан!')
        userId = data.user.id
      })
      .catch((err) => {
        message.error(err.data.message)
      })
      .then(
        () => {
          if (userId) {
            updateUser({ content, id: userId })
              .unwrap()
              .then((data) => {
                if (data) {
                  message.success('Данные успешно обновлены')
                  navigate('/')
                }
              })
              .catch((err) => {
                message.error(err.data.message)
              })
          }
        }
      )
  };

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

                <Steps current={current} items={items} />
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
                                  status={errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
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
                                  status={errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
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
                                    status={errors[item.name as keyof typeof errors] && touched[item.name as keyof typeof touched] ? 'error' : ''}
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
                    <Button
                      htmlType="submit"
                      type="primary"
                      disabled={isSubmitBtnAvailable(values, errors)}
                      className="register__button"
                    >
                      Перейти к тестированию
                    </Button>
                  )}
                  {current > 1 && (
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
