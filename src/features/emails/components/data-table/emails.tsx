"use client";

import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { EmailStore } from "~/features/emails/stores/email-store";

const Emails = () => {
  const { page } = EmailStore();
  const { data: metadata } = api.email.fetchCount.useQuery();
  const { data, isLoading } = api.email.fetchWithPagination.useQuery({
    limit: 50,
    offset: page,
  });

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      numRows={metadata?.count as number}
      isLoading={isLoading}
    />
  );
};

export { Emails };
