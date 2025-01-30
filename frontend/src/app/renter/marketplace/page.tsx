// src/app/renter/marketplace/page.tsx
"use client"; // Ensure this file is treated as a client component
import React, { useState } from "react";
import { LendersCard } from "@/components/example/CanvasRevealEffect";
import { useRouter } from "next/navigation";

export default function Marketplace() {
    const router = useRouter();
    // const [webrtcService, setWebrtcService] = useState<WebRTCService | null>(null);
    const [lenders, setLenders] = useState<string[]>(['lender1', 'lender2']); // Replace with your dynamic lender data


    return (
        <div className="min-h-screen mt-20">
            <main className="py-16 px-8">
                <h1 className="text-center text-4xl font-bold mb-12">
                    Welcome to the Marketplace
                </h1>
                {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
                {lenders.map((lender) => (
                    <LendersCard key={lender} lenderId={lender} />
                ))}
                {/* </div> */}
                <video id="remoteVideo" autoPlay style={{ width: '100%', marginTop: '20px' }} />
            </main>
        </div>
    );
}
