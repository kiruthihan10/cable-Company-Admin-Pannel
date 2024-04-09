"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import ViewCompanyForm from "@/forms/company/viewCompanyForm";
import {
  CompanyFormInitialValues,
  CompanyFormValidation,
} from "@/forms/company/companyForm";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Formik } from "formik";
import { useEffect } from "react";

interface ICompanyPageProps {
  params: { id: number };
}

const CompanyPage = (props: ICompanyPageProps) => {
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getCompany } = useAPIController();
  useEffect(() => {
    setHeader("Add Companies");
  });
  const { data, isLoading, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCompany(Number(queryKey[1]));
    },
    queryKey: [queryKeys.companies, id],
  });
  if (isLoading) {
    return <Spin spinning fullscreen />;
  }
  const onSubmit = () => {};
  return (
    <Formik
      initialValues={
        data?.data
          ? {
              name: data.data.companyName,
              email: data.data.contactPerson.email,
              firstName: data.data.contactPerson.firstName,
              lastName: data.data.contactPerson.lastName,
              phoneNumber: data.data.contactPerson.phoneNumber,
              isActive: data.data.companyIsActive,
            }
          : CompanyFormInitialValues
      }
      validationSchema={CompanyFormValidation}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <ViewCompanyForm
        companyID={id}
        contactPersonID={data?.data.contactPerson.username || ""}
      />
    </Formik>
  );
};

export default CompanyPage;
