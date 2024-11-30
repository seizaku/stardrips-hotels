"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { type Promotion } from "~/server/api/routers/promos/router";

const Promotions = () => {
  const { data, isLoading } = api.promotion.fetchAll.useQuery();

  return (
    <DataTable
      columns={columns}
      data={(data ?? []) as Promotion[]}
      isLoading={isLoading}
    />
  );
};

export { Promotions };
