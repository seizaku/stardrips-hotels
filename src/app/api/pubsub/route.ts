import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function POST() {
  await api.pubSub.gmail();
  return NextResponse.json(true);
}
