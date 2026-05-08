import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSlider() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/vaping-lifestyle.png"
                    alt="VapeNova Premium Vaping"
                    fill
                    priority
                    quality={85}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="backdrop-blur-md bg-black/30 rounded-2xl p-8 md:p-14 border border-white/10 shadow-2xl">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent leading-tight">
                            Welcome to VapeNova
                        </h1>
                        <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                            Discover premium vapes, vaporizers, and gummies. Your trusted source for quality products.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-shadow">
                                    Shop Now
                                </Button>
                            </Link>
                            <Link href="/about" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 bg-black/30 border-2 hover:bg-black/50 transition-colors">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
