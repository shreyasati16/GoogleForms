import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import axios from "axios";
import { accessToken } from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import {
    emailRegExp,
    EMAIL_IS_REQUIRED,
    EMAIL_REGEX_VALDATION_MESSAGE,
    ENTER_YOUR_EMAIL,
    ENTER_YOUR_USERNAME,
    FIRST_NAME_REQUIRE,
    F_NAME,
    MIN_CHARACTER,
    nameRegExp,
    NAME_regex_message,
    PHONENO_INVALID,
    phoneRegExp,
    PHONE_REQUIRE,
    TOO_LONG,
    TOO_SHORT,
    userNameMessage,
    userNameRegex,
    USERNAME_IS_REQUIRED,
} from "../../Constants/Constants";

const SignUp = ({ handleLoading }) => {
    const navigate = useNavigate();
    const initialValues = {
        first_name: "",
        last_name: "",
        username: "",
        contact: "",
        email: "",
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string(F_NAME)
            .min(3, MIN_CHARACTER)
            .matches(nameRegExp, NAME_regex_message)
            .required(FIRST_NAME_REQUIRE),
        last_name: Yup.string()
            .min(3, MIN_CHARACTER)
            .matches(nameRegExp, NAME_regex_message)
            .required(FIRST_NAME_REQUIRE),
        username: Yup.string(ENTER_YOUR_USERNAME)
            .matches(userNameRegex, userNameMessage)
            .required(USERNAME_IS_REQUIRED),
        contact: Yup.string()
            .required(PHONE_REQUIRE)
            .matches(phoneRegExp, PHONENO_INVALID)
            .min(10, TOO_SHORT)
            .max(10, TOO_LONG),

        email: Yup.string(ENTER_YOUR_EMAIL)
            .matches(emailRegExp, EMAIL_REGEX_VALDATION_MESSAGE)
            .required(EMAIL_IS_REQUIRED),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            handleLoading();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "237",
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            console.log(values);
            const response = await axios.post(
                `${process.env.REACT_APP_API}/account/signup/`,
                values,
                config
            );
            console.log(response);
            resetForm();
            alert("Signup Successfull");
            navigate("/dashboard");
        } catch (errors) {
            if (errors.response.status == 400) {
                console.log("username already exists");
            }
        } finally {
            handleLoading();
        }
    };
    return (
        <div className="form-container">
            <h1 className="form-title">Sign Up </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <Field
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="first_name"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <Field
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="last_name"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact</label>
                            <Field
                                type="text"
                                name="contact"
                                id="contact"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="contact"
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="form-field"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                            />
                        </div>
                        <button type="submit" className="form-button">
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
