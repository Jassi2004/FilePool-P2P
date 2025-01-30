"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { loginRenter } from "@/services/renterService"; // Import your service

export default function RenterLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error
        setIsLoading(true); // Start loading state

        try {
            const response = await loginRenter(email, password);

            // Check if login is successful by validating the message
            if (response.message === "Login successful!") {
                console.log("Login successful", response);
                router.push("/renter/marketplace"); // Navigate to marketplace on success
            } else {
                throw new Error(response.message || "Invalid credentials");
            }
        } catch (error: any) {
            console.error("Login failed:", error.message);
            setError(error.message); // Display error message
        } finally {
            setIsLoading(false); // End loading state
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="justify-center flex font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Login as a Renter
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    {/* Display error message if it exists */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </LabelInputContainer>

                    <button
                        className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Sign in →"}
                        <BottomGradient />
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/renter/register" className="text-blue-500 hover:underline">
                            New to FilePool? Register here.
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

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
    </div>
);
