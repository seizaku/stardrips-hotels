"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TableStore } from "~/features/listings/stores/table-store";

const Listings = () => {
  const { page } = TableStore();
  const { data, isLoading } = api.matchedListings.fetchAll.useQuery({
    limit: 100,
    offset: page,
  });

  return (
    <DataTable
      columns={columns}
      data={data?.rows ?? []}
      numRows={data?.count ?? 0}
      isLoading={isLoading}
    />
  );
};

export { Listings };
