import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { Promotions } from "~/features/promotions/components/data-table/promotions";

export default async function PromosPage() {
  return (
    <Container>
      <Navbar />
      <Promotions />
    </Container>
  );
}
