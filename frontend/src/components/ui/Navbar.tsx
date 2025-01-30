"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>

                {/* Home link */}
                <HoveredLink href="/">Home</HoveredLink>

                {/* Services Dropdown */}
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/renter/login">Rent Storage</HoveredLink>
                        <HoveredLink href="/lender/login">Lend Storage</HoveredLink>
                    </div>
                </MenuItem>

                {/* Pricing link */}
                <HoveredLink href="/pricing">Pricing</HoveredLink>

                {/* About Us Dropdown */}
                <MenuItem setActive={setActive} active={active} item="About Us">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/how-it-works">How It Works</HoveredLink>
                        <HoveredLink href="/contact">Contact Us</HoveredLink>
                    </div>
                </MenuItem>

            </Menu>
        </div>
    );
}
