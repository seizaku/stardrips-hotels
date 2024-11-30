import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { MatchedListings } from "~/features/matched/components/data-table/matched-listings";

export default async function MatchedListingsPage() {
  return (
    <Container>
      <Navbar />
      <MatchedListings />
    </Container>
  );
}
