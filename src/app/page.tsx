"use client";

import { Formik } from "formik";
import styles from "./page.module.css";
import * as Yup from "yup";
import LoginForm from "@/forms/loginForm";
import { ILoginRequest } from "@/external/service";
import { useMutation } from "react-query";
import { MutateConstants, MutateLogin } from "@/external/mutation";

export default function Home() {
  const initialValues: ILoginRequest = {
    username: "",
    password: "",
  };
  const loginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });
  const { mutate } = useMutation({
    mutationKey: [MutateConstants.login],
    mutationFn: MutateLogin,
    onSuccess(data, _variables, _context) {
      // setUserType(data.userType);
      // setToken(data.token);
      // redirectUser(data.userType);
    },
    onError(_error) {
      // setShowModal(true);
    },
  });

  const onLogin = (values: ILoginRequest) => {
    return mutate(values);
  };
  return (
    <main className={styles.main}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        enableReinitialize
        onSubmit={onLogin}
      >
        <LoginForm />
      </Formik>
    </main>
  );
}
