import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../ui/loginForm";
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
                    <hr/>
                    <RegisterForm />
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
                  <h2 className="mb-4 text-dark text-muted">Вход</h2>
                    <hr/>

                    <LoginForm />
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
