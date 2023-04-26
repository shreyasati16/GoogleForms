import React, { useState } from "react";
import "./Login.css";
import { useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn_postData } from "../../Services/Services";
import { error } from "../../Constants/Constants";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  /* This is to hide error message received after entering invalid credentials as soon as input fields are changed */
  const handleChange = () => {
    setErr(false);
  };

  return (
    <div className="myLogin-bg-img">
      <div className="myLogin-form">
        {err ? <p className="myLogin-err">{error}</p> : ""}
        <h1 className="myLogin-heading">Hello Admin</h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          /* This is to submit the form and logging in the superAdmin with the correct credentials*/
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            navigate("/dashboard");
            
            // signIn_postData({
            //   username: values.username,
            //   password: values.password,
            // })
            //   .then((response) => {
            //     setErr(false);
            //     console.log(response.data);
            //     localStorage.setItem("accessToken", response.data.access);
            //     localStorage.setItem("refreshToken", response.data.refresh);
            //     localStorage.setItem("role", response.data.role);
            //     if(response.data.role === "admin"){
            //       navigate("/dashboard");
            //     }else {
            //       navigate("/");
            //     }
            //   })
            //   .catch((error) => {
            //     setErr(true);
            //     return error;
            //   });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="username"
                  className="myLogin-inputs"
                  placeholder="Enter Username"
                  onClick={handleChange}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="myLogin_error_msg"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  className="myLogin-inputs"
                  placeholder="Enter Password"
                  onClick={handleChange}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="myLogin_error_msg"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="myLogin_btn"
              >
                Login
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;