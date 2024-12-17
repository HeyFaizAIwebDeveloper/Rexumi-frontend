import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" py-4 border-t border-white/10 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                    <p className="text-sm text-center md:text-left w-full md:w-auto">
                        © {new Date().getFullYear()} AI Resume Builder. All
                        rights reserved.
                    </p>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Link
                            href="/terms"
                            className="text-sm  hover:text-white/80 transition-colors text-center w-full md:w-auto"
                        >
                            Terms and Conditions
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm  hover:text-white/80 transition-colors text-center w-full md:w-auto"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" w-full flex mt-4 items-center justify-center   ">
                <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
                    REXUMI
                </h1>
            </div>
        </footer>
    );
}
