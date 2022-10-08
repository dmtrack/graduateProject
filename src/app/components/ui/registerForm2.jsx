import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/slices/userSlice";
import { getSegments } from "../store/slices/segmentSlice";
import { getCities } from "../store/slices/citySlice";
import { Button, Form, Input, Radio, Select } from "antd";
const { Option } = Select;

const RegisterFormNew = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    city: "",
    sex: "male",
    name: "",
    segment: [],
    // licence: false,
    comments: null,
  });
  const segments = useSelector(getSegments());

  const cities = useSelector(getCities());
  const citiesList = cities.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.target.name]: target.target.value,
    }));
  };
  const handleSelectChange = (name, target) => {
    setData((prevState) => ({
      ...prevState,
      [target.label]: target.value,
    }));
  };
  const handleMultiSelectChange = (name, target) => {
    const segments = [];
    target.map((e) => {
      segments.push({ value: e.value, label: e.children });
    });
    setData((prevState) => ({
      ...prevState,
      ["segment"]: segments,
    }));
  };
  console.log("data", data);
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    city: {
      isRequired: {
        message: "Обязательно выберите ваш город",
      },
    },
    // licence: {
    //     isRequired: {
    //         message:
    //             "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
    //     },
    // },
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
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      segment: data.segment.map((s) => s.value),
    };
    dispatch(signUp(newData));
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 8,
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
        value={data.name}
        label="Имя"
        name="name"
        rules={[
          {
            required: true,
            message: "Введите ваше имя",
          },
        ]}
      >
        <Input name="name" onChange={handleChange} />
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
        label="Город"
        name="city"
        rules={[
          {
            required: true,
            message: "Введите ваш город",
          },
        ]}
      >
        <Select onChange={handleSelectChange}>
          {cities.map((c) => (
            <Option value={c._id} label="city" key={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 2,
          span: 8,
        }}
        label={"Ваш пол"}
        required={true}
      >
        <Radio.Group onChange={handleChange} value={data.sex} name="sex">
          <Radio value={"male"}>Male</Radio>
          <Radio value={"female"}>Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 8,
        }}
        label={"Ваш сегмент"}
        required={true}
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          onChange={handleMultiSelectChange}
        >
          {segments.map((s) => (
            <Option value={s._id} label="segments" key={s._id}>
              {s.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >
        <Button type="secondary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterFormNew;
