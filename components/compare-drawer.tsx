"use client";

import { useCompareStore } from "@/store/compare-store";
import Link from "next/link";
import Image from "next/image";
import { X, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CompareDrawer() {
  const { items, removeItem, clear } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t-2 border-primary shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <GitCompare className="h-5 w-5 text-primary shrink-0" />
          <span className="text-sm font-semibold text-white shrink-0">Compare ({items.length}/3)</span>

          <div className="flex-1 flex items-center gap-2 overflow-x-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 bg-gray-800 rounded-lg px-2 py-1 shrink-0">
                <div className="w-8 h-8 relative rounded overflow-hidden bg-gray-700">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <span className="text-xs text-white max-w-[100px] truncate hidden sm:block">{item.name}</span>
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {[...Array(3 - items.length)].map((_, i) => (
              <div key={i} className="w-24 h-10 border-2 border-dashed border-gray-700 rounded-lg shrink-0 hidden sm:flex items-center justify-center">
                <span className="text-xs text-gray-600">+ Add</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 shrink-0">
            {items.length >= 2 && (
              <Link href={`/compare?ids=${items.map((i) => i.id).join(",")}`}>
                <Button size="sm">Compare Now</Button>
              </Link>
            )}
            <Button size="sm" variant="ghost" onClick={clear}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
