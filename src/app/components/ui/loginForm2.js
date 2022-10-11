import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, logIn } from "../store/slices/userSlice";
import { Button, Checkbox, Form, Input } from "antd";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const loginError = useSelector(getAuthError());
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.target.name]: target.target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(logIn({ payload: data, redirect }));
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      autoComplete="on"
    >
      <Form.Item
        value={data.email}
        label="Эл-почта"
        name="email"
        rules={[
          {
            required: true,
            message: "Введите адрес электронной почты",
          },
        ]}
      >
        <Input name="email" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите ваш пароль",
          },
        ]}
      >
        <Input.Password name="password" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      ></Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="secondary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
