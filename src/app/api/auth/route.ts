import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queries = url.searchParams;
  const result = await api.auth.callback({ code: queries.get("code") ?? "" });

  return NextResponse.json(result);
}
