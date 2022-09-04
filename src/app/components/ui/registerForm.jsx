import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiselectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/slices/userSlice";
import {getSegments} from "../store/slices/segmentSlice";
import {getCities} from "../store/slices/citySlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        city: "",
        sex: "male",
        name: "",
        segments: [],
        // licence: false,
        comments: null
    });
    const segments = useSelector(getSegments());
    const segmentsList = segments.map((s) => ({
        label: s.name,
        value: s._id,
    }));
    const cities = useSelector(getCities());
    const citiesList = cities.map((c) => ({
        label: c.name,
        value: c._id,
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
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
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            segments: data.segments.map((s) => s.value),
        };
        dispatch(signUp(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите свой город"
                defaultOption="Select..."
                options={citiesList}
                name="city"
                onChange={handleChange}
                value={data.city}
                error={errors.city}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={segmentsList}
                onChange={handleChange}
                defaultValue={data.segments}
                name="segments"
                label="Выберите отрасль"
            />
            {/*<CheckBoxField*/}
            {/*    value={data.licence}*/}
            {/*    onChange={handleChange}*/}
            {/*    name="licence"*/}
            {/*    error={errors.licence}*/}
            {/*>*/}
            {/*    Подтвердить <a>лицензионное соглашение</a>*/}
            {/*</CheckBoxField>*/}
            <button
                className="btn btn-secondary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
