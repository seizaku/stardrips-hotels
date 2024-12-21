import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { api } from "~/trpc/server";
import { DataTable } from "~/features/metadata/components/data-tables/data-table";
import { columns } from "~/features/metadata/components/data-tables/columns";
import { cache } from "react";

interface Page {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}

export default async function MetadataPage({ searchParams }: Page) {
  const { query, page, limit } = await searchParams;
  const rows = await api.metadata.fetchWithQuery({ query, page, limit });
  const count = cache(async () => await api.metadata.count());

  return (
    <Container>
      <Navbar />
      <DataTable columns={columns} data={rows} maxSize={await count() ?? 0} />
    </Container>
  );
}
