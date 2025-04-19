"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}
const NavbarItem = (
    { href,
        children,
        isActive
    }: NavbarItemProps) => {
    return (
        <Button
            asChild//which tell now ,this href is can be used 
            // `asChild` ka matlab hai ki `Button` component apne child element (yaha `Link`)
            //  ko directly render karega, apne default HTML element (jaise `<button>`) ke bajay.
            //  Yani `Button` ka styling aur props `Link` pe apply honge, 
            // lekin `Link` ka original behavior (Next.js routing) bana rahega.
            // &&
            // <Link> element hi button ban jaata hai, aur Button ki styling uspe apply hoti hai.
            variant="outline" className={cn(
                "bg-transparent hover:transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                isActive && "bg-black text-white hover:bg-black hover:text-white"
            )}>
            <Link href={href}>
                {children}
            </Link>

        </Button>
    )
}

const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/features", children: "Features" },
    { href: "/pricing", children: "Pricing" },
    { href: "/contact", children: "Contact" }
]

export const Navbar = () => {
    const pathName = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white ">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    funroad
                </span>
            </Link>
            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />

            <div className="items-center gap-4 hidden lg:flex">
                {
                    navbarItems.map((item) => (
                        <NavbarItem key={item.href} href={item.href}
                            isActive={pathName === item.href}
                        >  {item.children}</NavbarItem>
                    ))
                }
            </div>
            <div className="hidden lg:flex">
                <Button asChild variant="secondary"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-white hover:bg-pink-400 transition-colors text-lg"
                >
                    <Link href="/sign-in">
                        LogIn
                    </Link>
                </Button>
                <Button asChild variant="secondary"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-black text-white hover:bg-pink-400 transition-colors text-lg"
                >
                    <Link href="/sign-up">
                        Start Selling</Link>
                </Button>

            </div>

            <div className="flex lg:hidden items-centre justify-centre">
                <Button variant="ghost"
                    className="size-12 border-transparent bg-white"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <MenuIcon />

                </Button>
            </div>

        </nav>
    );
};
