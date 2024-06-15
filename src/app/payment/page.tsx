"use client";

import AppButton from "@/components/unitComponents/button";
import { urls } from "@/constants";
import { ISingleCustomerPaymentResponse } from "@/external/interfaces/paymentInterface";
import { ISingleUserResponse } from "@/external/interfaces/userInterface";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Divider, Row, Table } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentsPage = () => {
  const router = useRouter();
  const { getCustomerPayments } = useAPIController();
  const setHeader = useSystemStore((State) => State.setHeader);

  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  useEffect(() => {
    setHeader("Payments");
  });
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCustomerPayments(
        Number(queryKey[1]),
        queryKey[2] === undefined ? undefined : Number(queryKey[2]),
        undefined,
        undefined,
        queryKey[3] === undefined ? undefined : String(queryKey[3]),
        queryKey[4] === undefined ? undefined : String(queryKey[4])
      );
    },
    queryKey: [
      queryKeys.customerPayments,
      pageNumber,
      size,
      startDate,
      endDate,
    ],
  });

  const { RangePicker } = DatePicker;

  const renderDiscriminator = (discriminator: string) => {
    let result = "";

    for (let i = 0; i < discriminator.length; i++) {
      const currentChar = discriminator[i];
      const isUpper = currentChar.toUpperCase() === currentChar; // Check for uppercase

      // Check if it's the first character or previous character is also uppercase (for acronyms)
      if (
        i === 0 ||
        currentChar.charCodeAt(0) - 32 < discriminator[i - 1].charCodeAt(0)
      ) {
        if (isUpper) {
          result += " "; // Add space before uppercase (except first character)
        }
      }
      result += currentChar;
    }

    return result.trim();
  };

  const renderAmount = (amount: number) => {
    return `${amount} Rs`;
  };

  const renderPayer = (payer: ISingleUserResponse) => {
    return `${payer.firstName[0]}.${payer.lastName}`;
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "discriminator",
      key: "discriminator",
      render: renderDiscriminator,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: renderAmount,
    },
    {
      title: "Payer",
      dataIndex: "payer",
      key: "payer",
      render: renderPayer,
    },
  ];

  const paginationChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSize(pageSize);
  };
  const generateRowKey = (record: ISingleCustomerPaymentResponse) => {
    return record.id;
  };
  const createPayment = () => {
    router.push(`/${urls.payment}/${urls.add}`);
  };
  const onRow = (
    record: ISingleCustomerPaymentResponse,
    rowIndex: number | undefined
  ) => {
    const onClick = () => {
      router.push(`/${urls.payment}/${record.id}`);
    };
    return { onClick };
  };
  const onRangePickerUpdate = (dates: any, dateString: [string, string]) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  return (
    <>
      <Row>
        <Col span={8}>
          <AppButton text={"Add New Payment"} onClick={createPayment} />
        </Col>
        <Col offset={12} span={4}>
          <RangePicker
            value={[
              startDate !== undefined ? dayjs(startDate) : null,
              endDate !== undefined ? dayjs(endDate) : null,
            ]}
            onChange={onRangePickerUpdate}
            style={{ right: 0 }}
          />
        </Col>
      </Row>
      <Divider />
      <Table
        dataSource={data?.data.payments}
        columns={columns}
        loading={isLoading}
        pagination={{
          defaultCurrent: pageNumber,
          total: data?.data.noOfPayments,
          onChange: paginationChange,
        }}
        rowKey={generateRowKey}
        onRow={onRow}
      />
    </>
  );
};

export default PaymentsPage;
