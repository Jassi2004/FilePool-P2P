import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { getAllLenders } from "@/services/lenderService";
import { Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";
interface Lender {
    id: string;
    firstName: string;
    lastName: string;
    reputation: number;
    storageCapacity: number;
    maxRentalDuration: number;
    available: boolean;
    avatarUrl?: string; // New optional field for avatar URL
}

export function LendersCard() {
    const router = useRouter();

    const [lenders, setLenders] = useState<Lender[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLenders = async () => {
            try {
                const response = await getAllLenders();
                setLenders(response);
                setLoading(false);
            } catch (err) {
                setError("An error occurred while fetching lenders.");
                setLoading(false);
            }
        };

        fetchLenders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const colors = [
        "bg-red-500",          // Tomato
        "bg-blue-500",         // Dodger Blue
        "bg-yellow-400",       // Gold
        "bg-green-800",        // Green
        "bg-pink-500",         // Deep Pink
        "bg-sky-400",          // Light Steel Blue
        "bg-orange-500",       // Red Orange
        "bg-purple-600",       // Dark Violet
        "bg-pink-300",         // Hot Pink
        "bg-green-600"         // Medium Sea Green
    ];

    // Function to get a random color class from the array
    const getRandomColorClass = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };


    const connectToLender = () => {
        router.push('/renter/upload')
    };

    return (
        <div className="grid grid-cols-3 gap-4 mx-auto px-8 py-8 boc">
            {lenders.map((lender) => {
                const randomColorClass = getRandomColorClass(); // Get a random color class for the card

                return (
                    <Card
                        key={lender.id}
                        {...lender}
                        onClick={connectToLender} // Pass the click handler
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName={`relative ${randomColorClass}`} // Apply random Tailwind class
                        />
                    </Card>
                );
            })}
        </div>
    );
}

const Card = ({
    storageCapacity,
    firstName,
    lastName,
    reputation,
    maxRentalDuration,
    available,
    onClick, // Add onClick prop
    children,
}: Lender & { onClick: () => void; children?: React.ReactNode }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick} // Trigger the onClick event
            className="shadow-[0_0px_5px_rgba(255,255,255,0.5)] border rounded-xl border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]"
        >
            {/* Animate Presence for Hover Effect */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full w-full absolute inset-0 rounded-xl"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="relative z-20">
                <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
                    <div className="flex flex-col">
                        <span className="text-4xl font-bold">{storageCapacity} Gb</span>
                        <div className="w-[20rem] h-40 relative">
                            {/* Gradients */}
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-1/2 blur-sm" />
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-1/2" />
                            <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/6 blur-sm" />
                            <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/6" />
                        </div>

                        <div className="flex items-center justify-center transition-all duration-300 group-hover/canvas-card:text-white">
                            <StarRating rating={reputation} />
                        </div>
                    </div>
                </div>

                <div className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                    <div className="text-3xl font-bold transition-all duration-300 group-hover/canvas-card:text-white">
                        {storageCapacity} GB
                    </div>
                    <h2 className="text-xl font-semibold transition-all duration-300 group-hover/canvas-card:text-white">
                        {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover/canvas-card:text-gray-200">
                        Reputation: {reputation}
                    </p>
                    <p className="text-sm transition-all duration-300 group-hover/canvas-card:text-gray-200">
                        Max Rental: {maxRentalDuration} days
                    </p>
                    <p className={`text-sm font-medium ${available ? 'text-green-500' : 'text-red-500'} transition-all duration-300 group-hover/canvas-card:text-white`}>
                        {available ? 'Available' : 'Unavailable'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const StarRating = ({ rating = 0 }: { rating?: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
                } else if (index === fullStars && hasHalfStar) {
                    return <StarHalf key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
                } else {
                    return <Star key={index} className="w-5 h-5 text-gray-300" />;
                }
            })}
        </div>
    );
};
