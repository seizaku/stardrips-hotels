import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { Emails } from "~/features/emails/components/data-table/emails";

export default async function HotelsPage() {
  return (
    <Container>
      <Navbar />
      <Emails />
    </Container>
  );
}
