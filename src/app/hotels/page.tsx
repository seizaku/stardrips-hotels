import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { Hotels } from "~/features/hotels/components/data-table/hotels";

export default async function HotelsPage() {
  return (
    <Container>
      <Navbar />
      <Hotels />
    </Container>
  );
}
