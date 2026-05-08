import { Truck } from "lucide-react";

export default function FreeShippingBanner() {
  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 fixed top-0 left-0 right-0 z-[60]">
      <Truck className="h-4 w-4 shrink-0" />
      <span>Free shipping on orders over $50 — Shop now and save!</span>
    </div>
  );
}
