import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col } from "antd";
import LoginForm2 from "../ui/loginForm2";
import RegisterFormNew from "../ui/registerForm2";
import { Typography } from "antd";
const { Title, Text } = Typography;

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = (params) => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <>
      {formType === "register" ? (
        <Row>
          <Col span={20}>
            <Title level={3}>Регистрация</Title>
            <Divider />
            <RegisterFormNew />
            <p style={{ marginLeft: "10px" }}>
              У вас есть аккаунт?
              <a role="button" onClick={toggleFormType}>
                {" "}
                Вход
              </a>
            </p>
          </Col>
          <Col span={1}></Col>
        </Row>
      ) : (
        <Row>
          <Col span={20}>
            <Title level={3}>Вход</Title>
            <Divider />

            <LoginForm2 />
            <p style={{ marginLeft: "10px" }}>
              Нет аккаунта?{" "}
              <a role="button" onClick={toggleFormType}>
                {" "}
                Регистрация
              </a>
            </p>
          </Col>
          <Col span={1}></Col>
        </Row>
      )}
    </>
  );
};

export default Login;
