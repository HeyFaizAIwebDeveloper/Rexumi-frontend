"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


export default function Navbar() {


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className=" w-full flex items-center justify-between p-6"
        >
            <Link href="/" className="text-xl font-semibold">
                Reximu
            </Link>

            <div className=" flex justify-between items-center gap-4">
                <Button variant={"ghost"} >
                    <Link href="/login">Log in</Link>
                </Button>

                <Button variant={"default"}>
                    <Link href="/signup">Sign up</Link>
                </Button>
            </div>
        </motion.nav>
    );
}
