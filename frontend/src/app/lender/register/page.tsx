"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { registerLender } from "@/services/lenderService"; // Import your service for registering lenders

export default function LenderSignupForm() {
    const router = useRouter(); // Get router instance
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        storageCapacity: "",
        maxRentalDuration: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await registerLender({
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password,
                storageCapacity: Number(formData.storageCapacity),
                maxRentalDuration: Number(formData.maxRentalDuration),
            });
            setSuccessMessage("Registration successful!");
            setError(null);
            // Navigate to the marketplace
            router.push("/lender/dashboard");
        } catch (err: any) {
            setError(err.message);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="justify-center flex font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Register as a Lender
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input
                                id="firstname"
                                placeholder="Tyler"
                                type="text"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input
                                id="lastname"
                                placeholder="Durden"
                                type="text"
                                value={formData.lastname}
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
                        <Label htmlFor="storageCapacity">Storage Capacity Available (in GB)</Label>
                        <Input
                            id="storageCapacity"
                            placeholder="e.g., 100"
                            type="number"
                            min="1"
                            value={formData.storageCapacity}
                            onChange={handleChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="maxRentalDuration">Maximum Rental Duration (in days)</Label>
                        <Input
                            id="maxRentalDuration"
                            placeholder="e.g., 30"
                            type="number"
                            min="1"
                            value={formData.maxRentalDuration}
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

                    {/* Display error or success messages */}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

                    {/* Link to Login Page */}
                    <div className="mt-4 text-center">
                        <Link href="/lender/login" className="text-blue-500 hover:underline">
                            Already have an account? Log in here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
