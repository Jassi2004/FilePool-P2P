// src/app/lender/dashboard/page.tsx
"use client"; // Ensure this file is treated as a client component
import React, { useEffect } from 'react';
import { WebRTCService } from '@/services/webrtcService'; // Import your WebRTC service

const LenderDashboard: React.FC = () => {
    useEffect(() => {
        const service = new WebRTCService();

        return () => {
            // Optionally clean up the service or listeners here if needed
        };
    }, []);

    return (
        <div className="min-h-screen mt-20">
            <h1 className="text-center text-4xl font-bold mb-12">Lender Dashboard</h1>
            <video id="remoteVideo" autoPlay style={{ width: '100%', marginTop: '20px' }} />
        </div>
    );
};

export default LenderDashboard;
