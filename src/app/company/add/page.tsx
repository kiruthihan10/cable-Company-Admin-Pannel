"use client";

import { urls } from "@/constants";
import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import AddCompanyForm from "@/forms/company/addCompanyForm";
import {
  AddCompanyFormInitialValues,
  AddCompanyFormValidation,
  IAddCompanyForm,
} from "@/forms/company/companyForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddCompany = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  const setNotification = useSystemStore((state) => state.setNotification);
  useEffect(() => {
    setHeader("Add Companies");
  });
  const { addCompany } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: addCompany,
    onSuccess(data, _variables, _context) {
      setNotification({
        description: "Company created successfully",
        message: "Success",
        notificationType: "success",
      });
      router.push(`/${urls.company}`);
    },
    onError(error, _variables, _context) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setNotification({
            description: "User with Phone Number Already Exists",
            message: "Phone No Exists",
            notificationType: "error",
          });
        }
      }
    },
  });
  const onSubmit = (values: IAddCompanyForm) => {
    mutate({
      name: values.name,
      employeeCreateRequest: {
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: parseInt(`7${values.phoneNumber || 0}`),
      },
    });
  };

  return (
    <Formik
      initialValues={AddCompanyFormInitialValues}
      validationSchema={AddCompanyFormValidation}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <AddCompanyForm />
    </Formik>
  );
};

export default AddCompany;
