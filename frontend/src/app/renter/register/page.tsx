// app/renter/register/page.tsx

"use client"; // Important for client-side components
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerRenter } from "@/services/renterService"; // Import the service
import Link from "next/link";

export default function RenterRegisterForm() {
    const router = useRouter(); // Get router instance
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        storageNeeded: "",
        rentalDuration: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerRenter({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                storageNeeded: Number(formData.storageNeeded),
                rentalDuration: Number(formData.rentalDuration),
            });
            setSuccessMessage("Registration successful!");
            setError(null);
            // Navigate to the marketplace
            router.push("/renter/marketplace");
        } catch (err: any) {
            setError(err.message);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="justify-center flex font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Register as a Renter
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                placeholder="Tyler"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                placeholder="Durden"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="storageNeeded">Storage Needed (in GB)</Label>
                        <Input
                            id="storageNeeded"
                            placeholder="e.g., 10"
                            type="number"
                            min="1"
                            value={formData.storageNeeded}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="rentalDuration">Rental Duration (in days)</Label>
                        <Input
                            id="rentalDuration"
                            placeholder="e.g., 30"
                            type="number"
                            min="1"
                            value={formData.rentalDuration}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

                    <div className="mt-4 text-center">
                        <Link href="/renter/login" className="text-blue-500 hover:underline">
                            Already have an account? Log in here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
    </div>
);
