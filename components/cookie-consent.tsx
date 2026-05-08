"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] bg-gray-900 border-t border-gray-700 p-4 shadow-2xl">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          We use cookies to improve your experience and analyse site traffic. By clicking "Accept", you agree to our{" "}
          <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <Button size="sm" variant="outline" onClick={decline}>Decline</Button>
          <Button size="sm" onClick={accept}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
