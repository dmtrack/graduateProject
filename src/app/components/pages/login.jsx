import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Row } from "antd";
import LoginForm2 from "../ui/loginForm2";
import RegisterFormNew from "../ui/registerForm2";
import RegisterForm from "../ui/registerForm";

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
    <div className="container-page">
      <div className="row">
        <div className="col-md-7 offset-md-1 ">
          {formType === "register" ? (
            <>
              <h2 className="mb-4 text-dark text-muted">Регистрация</h2>
              <Divider />
              <RegisterFormNew />
              <p>
                У вас есть аккаунт?{" "}
                <a role="button" onClick={toggleFormType}>
                  {" "}
                  Вход
                </a>
              </p>
            </>
          ) : (
            <>
              <h2
                className="mb-4 text-dark text-muted "
                style={{ marginRight: 5 }}
              >
                Вход
              </h2>
              <Divider />

              <LoginForm2 />
              <p>
                Нет аккаунта?{" "}
                <a role="button" onClick={toggleFormType}>
                  {" "}
                  Регистрация
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
