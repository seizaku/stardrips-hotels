"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const HotelsMetrics = () => {
  const { data, isLoading } = api.hotelMetrics.fetchAll.useQuery();

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
  );
};

export { HotelsMetrics };
