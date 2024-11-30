import { type ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <main className="p-12">{children}</main>;
};

export { Container };
