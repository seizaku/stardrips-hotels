import { type ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <main className="px-12 pt-24">{children}</main>;
};

export { Container };
