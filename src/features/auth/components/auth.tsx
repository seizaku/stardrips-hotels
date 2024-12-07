import Link from "next/link";
import React from "react";
import { Container } from "~/components/layouts/container";
import { buttonVariants } from "~/components/ui/button";

const Auth = ({ authURL }: { authURL?: string }) => {
  return (
    <Container>
      <div className="container mx-auto flex flex-col items-center">
        <Link href={`${authURL}`} className={buttonVariants()}>
          Request Token
        </Link>
      </div>
    </Container>
  );
};

export { Auth };
