"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return null;

  const isAdmin = (user.publicMetadata as any)?.role === "admin";
  const email = user.emailAddresses?.[0]?.emailAddress || "";
  const name = user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.username || "User";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <span className="font-medium">Name:</span> {name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/account/orders" className="block">
                <Button variant="outline" className="w-full justify-start">
                  My Orders
                </Button>
              </Link>
              {isAdmin && (
                <Link href="/admin" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
