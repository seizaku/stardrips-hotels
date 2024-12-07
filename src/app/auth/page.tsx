import { Container } from "~/components/layouts/container";
import { Navbar } from "~/components/layouts/navbar";
import { Auth } from "~/features/auth/components/auth";
import { api } from "~/trpc/server";

export default async function AuthPage() {
  const authURL = await api.auth.getAuthURL();

  return (
    <Container>
      <Navbar />
      <Auth authURL={authURL} />
    </Container>
  );
}
