import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PopupTagProps {
    name: string;
    form: any; // Replace 'any' with the appropriate type for your form
}

const PopupTag: React.FC<PopupTagProps> = ({ name, form }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="w-fit">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Add tag"
                    >
                        <Tag size={25} />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none">
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="label"
                                    {...field}
                                    aria-label="Tag label input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </PopoverContent>
        </Popover>
    );
};

export default PopupTag;
