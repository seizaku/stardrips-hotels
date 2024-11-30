import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { UnmatchedListings } from "~/features/unmatched/components/data-table/unmatched-listings";

export default async function UnmatchedListingsPage() {
  return (
    <Container>
      <Navbar />
      <UnmatchedListings />
    </Container>
  );
}
