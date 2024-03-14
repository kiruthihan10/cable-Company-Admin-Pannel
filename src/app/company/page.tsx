"use client";

import AppButton from "@/components/unitComponents/button";
import { urls } from "@/constants";
import { ISingleCompanyResponse } from "@/external/interfaces/companyInterfaces";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { Divider, Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Companies = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.userType != "Internal") {
      router.push("home");
    }
  });
  console.log(user);
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Companies");
  });
  const { getCompanies } = useAPIController();
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [companies, setCompanies] = useState<ISingleCompanyResponse[]>([]);
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCompanies(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2])
      );
    },
    queryKey: [queryKeys.companies, pageNumber, size],
  });
  useEffect(() => {
    setCompanies(data?.data.companies || []);
  }, [data?.data.companies]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Total Customers",
      dataIndex: "totalCustomers",
      key: "totalCustomers",
    },
    {
      title: "Total Employees",
      dataIndex: "totalEmployees",
      key: "totalEmployees",
    },
    {
      title: "Total Payments",
      dataIndex: "totalPayments",
      key: "totalPayments",
    },
    {
      title: "Total Areas",
      dataIndex: "totalAreas",
      key: "totalAreas",
    },
  ];

  const paginationChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSize(pageSize);
  };

  const addNewCompanyButtonClicked = () => {
    router.push(`${urls.company}/${urls.add}`);
  };
  return (
    <>
      <AppButton
        text={"Add New Company"}
        onClick={addNewCompanyButtonClicked}
      />
      <Divider />
      <Table
        dataSource={companies}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfCompanies,
          onChange: paginationChange,
        }}
      />
    </>
  );
};

export default Companies;
