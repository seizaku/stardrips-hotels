"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Hotels = () => {
  const { data, isLoading } = api.hotel.fetchAll.useQuery();

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
  );
};

export { Hotels };
