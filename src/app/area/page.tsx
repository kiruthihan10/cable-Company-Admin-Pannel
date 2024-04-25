"use client";

import AppButton from "@/components/unitComponents/button";
import { urls } from "@/constants";
import {
  IAreaAgent,
  ISingleAreaResponse,
} from "@/external/interfaces/areaInterface";
import { ISingleCustomerResponse } from "@/external/interfaces/customerInterface";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Divider, Table, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Areas = () => {
  const router = useRouter();
  const { getAreas } = useAPIController();
  const setHeader = useSystemStore((State) => State.setHeader);

  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [areas, setAreas] = useState<ISingleAreaResponse[]>([]);
  useEffect(() => {
    setHeader("Areas");
  });
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getAreas(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2]),
        String(queryKey[3])
      );
    },
    queryKey: [queryKeys.areas, pageNumber, size, sortColumn],
  });
  useEffect(() => {
    setAreas(data?.data.areas || []);
  }, [data?.data.areas]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Agent Name",
      dataIndex: "agent",
      key: "agentName",
      render: (agent: IAreaAgent) => {
        return `${agent.firstName} ${agent.lastName}`;
      },
      sorter: true,
    },
    {
      title: "No Of Customers",
      dataIndex: "noOfCustomers",
      key: "noOfCustomers",
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
  const generateRowKey = (record: ISingleAreaResponse) => {
    return record.id;
  };
  const createArea = () => {
    router.push(`/${urls.area}/${urls.add}`);
  };
  const onRow = (record: ISingleAreaResponse, rowIndex: number | undefined) => {
    const onClick = () => {};
    return { onClick };
  };
  return (
    <>
      <AppButton text={"Add New Area"} onClick={createArea} />
      <Divider />
      <Table
        dataSource={areas}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfAreas,
          onChange: paginationChange,
        }}
        onChange={onTableChange}
        rowKey={generateRowKey}
        onRow={onRow}
      />
    </>
  );
};

export default Areas;
