import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">
                        © 2023 AI Resume Builder. All rights reserved.
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/terms"
                            className="text-sm hover:text-gray-300 transition-colors"
                        >
                            Terms and Conditions
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm hover:text-gray-300 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
