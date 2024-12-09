import React from "react";


interface FormHeadingProps {
    label: string; 
    icon?: React.ReactNode;
}

function FormHeading({ label, icon }: FormHeadingProps) {
    return (
        <h1 className="flex items-center gap-2 text-4xl font-semibold mb-6 select-none">
            {icon}
            {label}
        </h1>
    );
}

export default FormHeading;