"use client";

import { ISingleEmployeeResponse } from "@/external/interfaces/employeeInterfaces";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Divider, Spin, Switch, Table, TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import AppButton from "@/components/unitComponents/button";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { urls } from "@/constants";

const Employees = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getEmployees } = useAPIController();
  useEffect(() => {
    setHeader("Employees");
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [employees, setEmployees] = useState<ISingleEmployeeResponse[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployees(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2]),
        String(queryKey[3])
      );
    },
    queryKey: [queryKeys.employees, pageNumber, size, sortColumn],
  });
  useEffect(() => {
    setEmployees(data?.data.employees || []);
  }, [data?.data.employees]);
  const renderAdmin = (admin: boolean) => {
    return (
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        value={admin}
        disabled
      />
    );
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      sorter: true,
      render: renderAdmin,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: true,
    },
    {
      title: "Customers",
      dataIndex: "totalCustomers",
      key: "totalCustomers",
      sorter: true,
    },
    {
      title: "Payments Collected",
      dataIndex: "totalPaymentCollections",
      key: "totalPaymentCollections",
      sorter: true,
    },
    {
      title: "Payments Generated",
      dataIndex: "totalPaymentGeneration",
      key: "totalPaymentGeneration",
      sorter: true,
    },
    {
      title: "Areas",
      dataIndex: "totalAreasUnderControl",
      key: "totalAreasUnderControl",
      sorter: true,
    },
  ];
  const paginationChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSize(pageSize);
  };
  const onTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ISingleEmployeeResponse> | any
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

  const generateRowKey = (record: ISingleEmployeeResponse) => {
    return record.username;
  };

  const addNewEmployee = () => {
    router.push(`/${urls.employee}/${urls.add}`);
  };
  if (isLoading) return <Spin />;
  return (
    <>
      <AppButton text={"Add New Employee"} onClick={addNewEmployee} />
      <Divider />
      <Table
        dataSource={employees}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfEmployees,
          onChange: paginationChange,
        }}
        onChange={onTableChange}
        rowKey={generateRowKey}
      />
    </>
  );
};

export default Employees;
