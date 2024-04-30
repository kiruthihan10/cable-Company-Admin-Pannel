"use client";

import AppButton from "@/components/unitComponents/button";
import { ISingleCustomerResponse } from "@/external/interfaces/customerInterface";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Divider, Switch, Table, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { urls } from "@/constants";

const Customers = () => {
  const router = useRouter();
  const { getCustomers } = useAPIController();
  const setHeader = useSystemStore((state) => state.setHeader);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [customers, setCustomers] = useState<ISingleCustomerResponse[]>([]);
  useEffect(() => {
    setHeader("Customers");
  });
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCustomers(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2]),
        String(queryKey[3])
      );
    },
    queryKey: [queryKeys.customers, pageNumber, size, sortColumn],
  });
  useEffect(() => {
    setCustomers(data?.data.customers || []);
  }, [data?.data.customers]);
  const renderSwitch = (status: boolean) => {
    return (
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        value={status}
        disabled
      />
    );
  };
  const renderCurrency = (amount: number) => {
    return `${amount} LKR`;
  };
  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_: any, record: ISingleCustomerResponse) => `${record.firstName[0]}.${record.lastName}`,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%"
    },
    {
      title: "Customer No",
      dataIndex: "customerNo",
      key: "customerNo",
    },
    {
      title: "Box CA No",
      dataIndex: "boxCaNumber",
      key: "boxCaNumber",
    },
    {
      title: "Active",
      dataIndex: "activeConnection",
      key: "activeConnection",
      render: renderSwitch,
      width: "10%"
    },
    {
      title: "Digital?",
      dataIndex: "hasDigitalBox",
      key: "hasDigitalBox",
      render: renderSwitch,
      width: "10%"
    },
    {
      title: "Permanant Disconnect",
      dataIndex: "isDisconnected",
      key: "isDisconnected",
      render: renderSwitch,
      width: "10%"
    },
    {
      title: "Start Date",
      dataIndex: "connectionStartDate",
      key: "connectionStartDate",
    },
  ];
  const paginationChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSize(pageSize);
  };
  const onTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ISingleCustomerResponse> | any
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
  const generateRowKey = (record: ISingleCustomerResponse) => {
    return record.username;
  };
  const createCustomer = () => {
    router.push(`/${urls.customer}/${urls.add}`);
  };
  const onRow = (
    record: ISingleCustomerResponse,
    rowIndex: number | undefined
  ) => {
    const onClick = () => {
      router.push(`/${urls.customer}/${record.username}`);
    };
    return { onClick };
  };
  return (
    <>
      <AppButton text={"Add New Customer"} onClick={createCustomer} />
      <Divider />
      <Table
        dataSource={customers}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfCustomers,
          onChange: paginationChange,
        }}
        onChange={onTableChange}
        rowKey={generateRowKey}
        onRow={onRow}
      />
    </>
  );
};

export default Customers;
