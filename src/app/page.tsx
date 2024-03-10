"use client";

import { Formik, FormikHelpers, FormikValues } from "formik";
import styles from "./page.module.css";
import * as Yup from "yup";
import LoginForm from "@/forms/loginForm";

export interface ILogin {
  username: string;
  password: string;
}

export default function Home() {
  const initialValues = {
    username: "",
    password: "",
  };
  const loginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });
  return (
    <main className={styles.main}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        enableReinitialize
        onSubmit={function (
          values: FormikValues,
          formikHelpers: FormikHelpers<FormikValues>
        ): void | Promise<any> {
          throw new Error("Function not implemented.");
        }}
      >
        <LoginForm />
      </Formik>
    </main>
  );
}
