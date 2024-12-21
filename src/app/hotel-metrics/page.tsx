import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { api } from "~/trpc/server";
import { DataTable } from "~/features/hotel-metrics/components/data-tables/data-table";
import { columns } from "~/features/hotel-metrics/components/data-tables/columns";
import { cache } from "react";
import { type HotelMetrics } from "~/server/api/routers/hotel-metrics/router";

interface Page {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}

export default async function HotelMetricsPage({ searchParams }: Page) {
  const { query, page, limit } = await searchParams;
  const rows = await api.hotelMetrics.fetchWithQuery({ query, page, limit });
  const count = cache(async () => await api.hotelMetrics.count());

  return (
    <Container>
      <Navbar />
      <DataTable columns={columns} data={JSON.parse(JSON.stringify(rows)) as HotelMetrics[]} maxSize={await count() ?? 0} />
    </Container>
  );
}
