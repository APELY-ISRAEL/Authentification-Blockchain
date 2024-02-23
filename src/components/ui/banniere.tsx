import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
export const Banniere = () => {
    const link=
        { name: 'dashboard', href: '/dashboard' };

    return (
        <header className="w-full h-[80vh] flex justify-center items-center flex-col gap-8 bg-[#0E0E10] ">
            <h1 className="md:text-3xl lg:text-7xl text-[#910AB4] font-extrabold font-mono  "> Create and Verify Identity Card</h1>
            <Button variant="outline"><Link href={link.name}>More... </Link></Button>
        </header>
    )
}