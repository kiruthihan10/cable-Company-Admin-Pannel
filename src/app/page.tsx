"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import LoginForm from "@/forms/loginForm";
import { ILoginRequest } from "@/external/service";
import { MutateLogin } from "@/external/mutation";
import { useUserStore } from "@/stores/userStore";
import { useSystemStore } from "@/stores/systemStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { urls } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/external/keys";

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const setUserType = useUserStore((state) => state.setUserType);
  const setToken = useUserStore((state) => state.setToken);
  const setHeader = useSystemStore((state) => state.setHeader);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: MutateLogin,
    onSuccess(data, _variables, _context) {
      setUserType(data.role);
      setToken(data.token);
      router.push(urls.home);
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
    <main>
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
