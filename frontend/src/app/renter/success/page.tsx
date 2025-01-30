"use client"; // Place this at the top of your file

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { useRouter } from 'next/navigation'; // Import from next/navigation

export default function UploadSuccessPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter(); // Use the router from next/navigation

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        router.push('/'); // Navigate to the dashboard on button click
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
            {mounted && (
                <SparklesCore
                    id="tsparticles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full absolute inset-0"
                    particleColor="#FFFFFF"
                />
            )}
            <div className="z-10 flex flex-col items-center max-w-5xl mx-auto px-4">
                <TextGenerateEffect words="Upload Successful!" className="text-6xl font-bold mb-8 text-center" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl text-center mb-12"
                >
                    Your data is now safely stored in the stars!
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    onClick={handleClick} // Call handleClick correctly
                >
                    Go to Dashboard
                </motion.button>
            </div>
        </div>
    );
}
