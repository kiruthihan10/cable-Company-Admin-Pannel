"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useSystemStore } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Companies = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  if (user?.userType != "Internal") {
    router.push("home");
  }
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Companies");
  });
  const { getCompanies } = useAPIController();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCompanies(Number(queryKey[1]), undefined);
    },
    queryKey: [queryKeys.companies, pageNumber],
  });

  return <></>;
};

export default Companies;
