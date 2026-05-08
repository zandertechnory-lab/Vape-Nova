"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const categories = [
  { name: "Vapes", subcategories: ["CBD Vapes", "STHL Vapes"] },
  { name: "Vaporizers", subcategories: ["Mighty Vaporizers"] },
  { name: "Gummies", subcategories: ["Mushroom Edibles"] },
];

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentSubcategory = searchParams.get("subcategory");

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return newParams.toString();
  };

  const content = (
    <div className="space-y-1">
      <Link href="/shop" onClick={() => setIsOpen(false)}>
        <Button variant={!currentCategory ? "default" : "ghost"} className="w-full justify-start">
          All Products
        </Button>
      </Link>
      {categories.map((category) => (
        <div key={category.name} className="space-y-1">
          <Link
            href={`/shop?${createQueryString({ category: category.name, subcategory: null })}`}
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant={currentCategory === category.name ? "default" : "ghost"}
              className="w-full justify-start"
            >
              {category.name}
            </Button>
          </Link>
          {category.subcategories.map((sub) => (
            <Link
              key={sub}
              href={`/shop?${createQueryString({ category: category.name, subcategory: sub })}`}
              className="block ml-4"
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant={currentSubcategory === sub ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                {sub}
              </Button>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters{currentCategory ? ` — ${currentCategory}` : ""}
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isOpen && (
          <Card className="mt-2">
            <CardContent className="pt-4">{content}</CardContent>
          </Card>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </Card>
      </div>
    </>
  );
}
