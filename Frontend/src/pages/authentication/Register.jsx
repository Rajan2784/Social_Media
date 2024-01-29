import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../../redux/auth/auth.action";

const validationSchema = {
  email: Yup.string()
    .email("Invalid email")
    .required("Please fill the email .."),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
};
const initialValues = {firstName:"",lastName:"", email: "", password: "", gender:"" };

const Register = () => {
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (value) => {
    value.gender=gender;
    console.log("handling submit form ", value);
    dispatch(registerUserAction({data:value}))
  };

  const handleChange=(e) => {
    setGender(e.target.value);
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <ErrorMessage
                name="gender"
                component={"div"}
                className="text-red-500"
              />
              </RadioGroup>
            </div>
          </div>

          <Button
            sx={{ padding: ".8rem 043m" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>

      <div className="flex gap-2 items-center justify-center pt-5">
        <p>if you have already account?</p>
        <Button onClick={()=>navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
