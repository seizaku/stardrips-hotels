"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Promotions = () => {
  const { data, isLoading } = api.promotion.fetchAll.useQuery();

  return (
    <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
  );
};

export { Promotions };
