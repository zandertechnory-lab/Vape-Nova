"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Vapes",
    subcategories: ["CBD Vapes", "STHL Vapes"],
  },
  {
    name: "Vaporizers",
    subcategories: ["Mighty Vaporizers"],
  },
  {
    name: "Gummies",
    subcategories: ["Mushroom Edibles"],
  },
];

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentSubcategory = searchParams.get("subcategory");

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    return newParams.toString();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/shop">
            <Button
              variant={!currentCategory ? "default" : "ghost"}
              className="w-full justify-start"
            >
              All Products
            </Button>
          </Link>
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <Link
                href={`/shop?${createQueryString({
                  category: category.name,
                  subcategory: null,
                })}`}
              >
                <Button
                  variant={currentCategory === category.name ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {category.name}
                </Button>
              </Link>
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory}
                  href={`/shop?${createQueryString({
                    category: category.name,
                    subcategory: subcategory,
                  })}`}
                  className="block ml-4"
                >
                  <Button
                    variant={
                      currentSubcategory === subcategory ? "default" : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start"
                  >
                    {subcategory}
                  </Button>
                </Link>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

