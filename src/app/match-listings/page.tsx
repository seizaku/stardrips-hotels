import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { api } from "~/trpc/server";
import { DataTable } from "~/features/match-listings/components/data-tables/data-table";
import { columns } from "~/features/match-listings/components/data-tables/columns";
import { cache } from "react";
import { MatchFormDialog } from "~/features/match-listings/components/match-form-dialog";

interface Page {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}

export default async function MatchListingsPage({ searchParams }: Page) {
  const { query, page, limit } = await searchParams;
  const rows = await api.matchListings.fetchWithQuery({ query, page, limit });
  const count = cache(async () => await api.matchListings.count());

  return (
    <Container>
      <Navbar />
      <DataTable columns={columns} data={rows} maxSize={await count() ?? 0} />
      <MatchFormDialog />
    </Container>
  );
}
