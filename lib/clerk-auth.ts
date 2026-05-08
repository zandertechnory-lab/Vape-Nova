import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), userId: null, user: null };
  }
  return { error: null, userId };
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), userId: null };
  }
  const user = await currentUser();
  const role = (user?.publicMetadata as any)?.role;
  if (role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), userId: null };
  }
  return { error: null, userId };
}
