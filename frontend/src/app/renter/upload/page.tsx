"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/ui/file-upload';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

const loadingStates = [
    { text: "Uploading your data..." },
    { text: "Encrypting your data..." },
    { text: "Processing the files..." },
    { text: "Finalizing the upload..." },
    { text: "Upload complete!" }
];

export default function RenterUploadPage() {
    const [uploadComplete, setUploadComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (uploadComplete) {
            // Show sparkles for a brief moment before redirecting
            const timer = setTimeout(() => {
                router.push('/renter/success'); // Redirect to success page
            }, 0); // Adjust time as needed
            return () => clearTimeout(timer);
        }
    }, [uploadComplete, router]);

    const handleUploadComplete = () => {
        setLoading(false);
        setUploadComplete(true);
    };

    const handleUploadStart = () => {
        setLoading(true);
        setUploadComplete(false);
    };

    const handleLaunchData = () => {
        handleUploadStart();
        // Simulate an upload delay
        setTimeout(() => {
            handleUploadComplete();
        }, 8000); // Adjust as needed
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
            <BackgroundBeamsWithCollision>
                <div className="flex flex-col">
                    <div className="w-full max-w-4xl z-10 mt-28">
                        <TextGenerateEffect words="Upload Your Data to the Stars" className="text-8xl font-bold mb-8 text-center" />
                    </div>

                    <div className="p-8">
                        <FileUpload
                            onUploadComplete={handleUploadComplete}
                            onUploadStart={handleUploadStart}
                        />

                        <div className="flex gap-5">
                            <div className="mt-8 ">
                                <HoverBorderGradient className="p-4">
                                    <h5 className="text-l font-semibold mb-2">Storage Duration: 30 Days</h5>
                                </HoverBorderGradient>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            onClick={handleLaunchData}
                        >
                            Launch Your Data
                        </motion.button>
                    </div>
                </div>

                {loading && (
                    <MultiStepLoader
                        loadingStates={loadingStates}
                        loading={loading}
                        duration={2000}
                        loop
                    />
                )}


            </BackgroundBeamsWithCollision>
        </div>
    );
}