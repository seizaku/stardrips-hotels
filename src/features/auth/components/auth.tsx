import Link from "next/link";
import React from "react";
import { Container } from "~/components/layouts/container";
import { buttonVariants } from "~/components/ui/button";
import { Watch } from "~/features/auth/components/watch";

const Auth = ({ authURL }: { authURL?: string }) => {
  return (
    <Container>
      <div className="container mx-auto flex gap-2 items-center justify-center">
        <Link href={`${authURL}`} className={buttonVariants()}>
          Request Token
        </Link>
        <Watch />
      </div>
    </Container>
  );
};

export { Auth };
