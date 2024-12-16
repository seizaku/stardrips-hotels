import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { HotelsMetrics } from "~/features/hotel-metrics/components/data-table/hotel-metrics";

export default async function HotelsPage() {
  return (
    <Container>
      <Navbar />
      <HotelsMetrics />
    </Container>
  );
}
