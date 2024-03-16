"use client";

import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import CompanyForm, {
  AddCompanyFormInitialValues,
  AddCompanyFormValidation,
  IAddCompanyForm,
} from "@/forms/companyForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useEffect } from "react";

const AddCompany = () => {
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Companies");
  });
  const { addCompany } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: addCompany,
    onSuccess(data, _variables, _context) {},
    onError(_error) {},
  });
  const onsubmit = (values: IAddCompanyForm) => {
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
      onSubmit={onsubmit}
    >
      <CompanyForm />
    </Formik>
  );
};

export default AddCompany;
