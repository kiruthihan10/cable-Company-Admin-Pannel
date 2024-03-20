"use client";

import AppButton from "@/components/unitComponents/button";
import { urls } from "@/constants";
import { ISingleCompanyResponse } from "@/external/interfaces/companyInterfaces";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { Divider, Table, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
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
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Companies");
  });
  const { getCompanies } = useAPIController();
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [companies, setCompanies] = useState<ISingleCompanyResponse[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCompanies(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2]),
        String(queryKey[3])
      );
    },
    queryKey: [queryKeys.companies, pageNumber, size, sortColumn],
  });
  useEffect(() => {
    setCompanies(data?.data.companies || []);
  }, [data?.data.companies]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
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
      sorter: true,
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
      sorter: true,
    },
    {
      title: "Total Customers",
      dataIndex: "totalCustomers",
      key: "totalCustomers",
      sorter: true,
    },
    {
      title: "Total Employees",
      dataIndex: "totalEmployees",
      key: "totalEmployees",
      sorter: true,
    },
    {
      title: "Total Payments",
      dataIndex: "totalPayments",
      key: "totalPayments",
      sorter: true,
    },
    {
      title: "Total Areas",
      dataIndex: "totalAreas",
      key: "totalAreas",
      sorter: true,
    },
  ];

  const paginationChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSize(pageSize);
  };

  const addNewCompanyButtonClicked = () => {
    router.push(`${urls.company}/${urls.add}`);
  };

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ISingleCompanyResponse> | any
  ) => {
    // switch (sorter);
    let sortKey = sorter.columnKey?.toString();
    if (sortKey === undefined) {
      sortKey === "name";
    } else {
      if (sortKey !== undefined) {
        if (sorter.order === "descend") {
          sortKey = `-${sortKey}`;
        }
        setSortColumn(sortKey);
      }
    }
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
        onChange={onTableChange}
      />
    </>
  );
};

export default Companies;
