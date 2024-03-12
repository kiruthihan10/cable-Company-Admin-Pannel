"use client";

import { ISingleCompanyResponse } from "@/external/interfaces/companyInterfaces";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Companies = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  //   useEffect(() => {
  //     if (user?.userType != "Internal") {
  //       router.push("home");
  //     }
  //   });
  console.log(user);
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Companies");
  });
  const { getCompanies } = useAPIController();
  const [pageNumber, setPageNumber] = useState(1);
  const [companies, setCompanies] = useState<ISingleCompanyResponse[]>([]);

  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCompanies(Number(queryKey[1]), undefined);
    },
    queryKey: [queryKeys.companies, pageNumber],
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
      title: "Id",
      dataIndex: "id",
      key: "id",
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
  return (
    <>
      <Table
        dataSource={companies}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfCompanies,
        }}
      />
    </>
  );
};

export default Companies;
