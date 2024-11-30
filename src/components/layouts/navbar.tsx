"use client";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { siteConfig } from "~/config/site-config";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-background">
      <ul className="flex items-center gap-2 px-12">
        <li className="mr-6 w-fit">
          <h1 className="font-bold">Stardrips Hotels.</h1>
        </li>
        {siteConfig.navigationLinks.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                path == link.href && "bg-muted",
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navbar };
