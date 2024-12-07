import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { Listings } from "~/features/listings/components/data-table/listings";

export default async function MatchedListingsPage() {
  return (
    <Container>
      <Navbar />
      <Listings />
    </Container>
  );
}
