"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AgeVerificationModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("ageVerified")) {
            setIsVisible(true);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem("ageVerified", "true");
        setIsVisible(false);
    };

    const handleDeny = () => {
        window.location.href = "https://www.google.com";
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md mx-4">
                <Card className="border-2 border-primary/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-primary/20">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink flex items-center justify-center">
                                <span className="text-4xl font-bold">18+</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                                Age Verification Required
                            </h2>
                            <p className="text-gray-300 text-lg">
                                You must be 18 years or older to access this website.
                            </p>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <p className="text-sm text-gray-400">
                                This website contains age-restricted products. By entering, you confirm that you are of legal age to purchase vaping products in your jurisdiction.
                            </p>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Button
                                onClick={handleConfirm}
                                size="lg"
                                className="w-full text-lg font-semibold h-14 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink hover:opacity-90 transition-opacity"
                            >
                                Yes, I'm 18 or Older
                            </Button>
                            <Button
                                onClick={handleDeny}
                                variant="outline"
                                size="lg"
                                className="w-full text-lg font-semibold h-14 border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors"
                            >
                                No, I'm Under 18
                            </Button>
                        </div>

                        <p className="text-xs text-gray-500 pt-2">
                            By clicking "Yes", you agree that you are of legal age and accept our terms and conditions.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
