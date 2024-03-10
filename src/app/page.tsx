"use client";

import { Formik } from "formik";
import styles from "./page.module.css";
import * as Yup from "yup";
import LoginForm from "@/forms/loginForm";
import { ILoginRequest } from "@/external/service";
import { useMutation } from "react-query";
import { MutateConstants, MutateLogin } from "@/external/mutation";
import { useUserStore } from "@/stores/userStore";
import { useSystemStore } from "@/stores/systemStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setUserType = useUserStore((state) => state.setUserType);
  const setToken = useUserStore((state) => state.setToken);
  const setHeader = useSystemStore((state) => state.setHeader);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: [MutateConstants.login],
    mutationFn: MutateLogin,
    onSuccess(data, _variables, _context) {
      setUserType(data.userType);
      setToken(data.token);
      router.push("home");
    },
    onError(_error) {
      // setShowModal(true);
    },
  });
  useEffect(() => {
    setHeader("Login");
  });
  const initialValues: ILoginRequest = {
    username: "",
    password: "",
  };
  const loginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const onLogin = (values: ILoginRequest) => {
    if (setUser) {
      setUser(values);
    }
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
