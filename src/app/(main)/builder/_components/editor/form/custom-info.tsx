import { PlusCircle } from "@phosphor-icons/react";
import React from "react";
import FormHeading from "../edit-form-heading";

function CustomForm() {
    return (
        <div className="max-w-2xl mx-auto shadow-md ">
            <FormHeading
                icon={<PlusCircle size={40} />}
                label="Custom Section"
            />
        </div>
    );
}

export default CustomForm;
