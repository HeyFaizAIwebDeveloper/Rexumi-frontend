"use client";
import React, { useState, useCallback } from "react";
import { Palette } from "@phosphor-icons/react";
import { HexColorPicker } from "react-colorful";
import debounce from 'lodash/debounce';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ResumeFromValues } from "@/lib/validations/resume";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { updateResumeData } from "../../../../../../../action/updateResumeData";


// Predefined color palette
const COLOR_PALETTE = [
    "#475569", "#6B7280", "#EF4444", "#F97316", "#F59E0B", 
    "#EAB308", "#84CC16", "#22C55E", "#14B8A6", "#06B6D4", 
    "#0EA5E9", "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", 
    "#D946EF", "#EC4899", "#F43F5E"
];

// Type for theme colors
type ThemeColors = {
    background: string;
    text: string;
    primary: string;
};

export default function ThemeSection() {
    const { resumeData, setResumeData } = useResumeContext();
    const { toast } = useToast();
    const params = useParams();
    const resumeId = params.id as string;

    // Initial theme state
    const [theme, setTheme] = useState<ThemeColors>({
        background: resumeData?.theme?.background || "#ffffff",
        text: resumeData?.theme?.text || "#000000",
        primary: resumeData?.theme?.primary || "#FF0000"
    });

    // Active color picker state
    const [activeColorPicker, setActiveColorPicker] = useState<keyof ThemeColors | null>(null);

    // Validate hex color format
    const isValidHexColor = (color: string): boolean => {
        const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i;
        return hexRegex.test(color);
    };

    // Normalize hex color
    const normalizeHexColor = (color: string): string => {
        // Remove # if exists
        const cleanColor = color.replace('#', '');
        
        // Expand shorthand (3-char) hex to full 6-char
        const fullColor = cleanColor.length === 3 
            ? cleanColor.split('').map(char => char + char).join('') 
            : cleanColor;

        return `#${fullColor.toUpperCase()}`;
    };

    // Debounced save function
    const debouncedSaveTheme = useCallback(
        debounce(async (newTheme: ThemeColors) => {
            try {
                const updatedResume = await updateResumeData(resumeId, {
                    theme: newTheme
                });
                
                setResumeData(updatedResume);
                
                toast({
                    title: "Theme Updated",
                    description: "Your resume theme colors have been successfully updated.",
                    variant: "default"
                });
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to update theme colors",
                    variant: "destructive"
                });
            }
        }, 500),
        [resumeId, setResumeData, toast]
    );

    // Handle color change
    const handleColorChange = (color: string, key: keyof ThemeColors) => {
        try {
            // Normalize and validate color
            const normalizedColor = normalizeHexColor(color);
            
            if (isValidHexColor(normalizedColor)) {
                const newTheme = { ...theme, [key]: normalizedColor };
                setTheme(newTheme);
                debouncedSaveTheme(newTheme);
            } else {
                throw new Error("Invalid color format");
            }
        } catch (error) {
            toast({
                title: "Invalid Color",
                description: "Please enter a valid hex color code.",
                variant: "destructive"
            });
        }
    };

    // Handle switch changes
    const handleSwitchChange = async (
        checked: boolean, 
        key: keyof Pick<ResumeFromValues, 'hideIcons' | 'underlineLinks'>
    ) => {
        try {
            const updatedResume = await updateResumeData(resumeId, {
                [key]: checked
            });
            
            setResumeData(updatedResume);
            
            toast({
                title: "Setting Updated",
                description: `${key === 'hideIcons' ? 'Icons visibility' : 'Links underline'} has been updated.`,
                variant: "default"
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update setting",
                variant: "destructive"
            });
        }
    };

    // Render color fields
    const renderColorFields = () => {
        const colorFields = [
            { key: "primary", label: "Primary Color" },
            { key: "background", label: "Background Color" },
            { key: "text", label: "Text Color" }
        ] as const;

        return colorFields.map(({ key, label }) => (
            <div key={key} className="space-y-2">
                <Label className="select-none text-zinc-200">
                    {label}
                </Label>
                <div className="border border-secondary px-1 flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className="w-6 h-6 rounded-full border border-secondary"
                                aria-label={`Toggle ${label.toLowerCase()} picker`}
                                style={{ backgroundColor: theme[key] }}
                                onClick={() => setActiveColorPicker(
                                    activeColorPicker === key ? null : key
                                )}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto border-none bg-transparent p-0">
                            <HexColorPicker
                                color={theme[key]}
                                onChange={(color: string) => handleColorChange(color, key)}
                            />
                        </PopoverContent>
                    </Popover>
                    <Input
                        value={theme[key]}
                        onChange={(e) => handleColorChange(e.target.value, key)}
                        className="flex-1 border-none font-mono group focus-visible:ring-0"
                        placeholder="Enter hex color"
                    />
                </div>
            </div>
        ));
    };

    return (
        <div className="w-full flex flex-col p-6 gap-10">
            <header>
                <h2 className="flex items-center gap-2.5 line-clamp-1 text-3xl font-bold">
                    <Palette size={30} />
                    Theme
                </h2>
            </header>
            
            <div className="flex flex-wrap gap-4">
                {COLOR_PALETTE.map((color) => (
                    <button
                        key={color}
                        className="w-6 h-6 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                        style={{
                            backgroundColor: color,
                            border: resumeData?.theme?.primary === color 
                                ? "2px solid white" 
                                : "1px solid rgba(0,0,0,0.1)",
                            boxShadow: resumeData?.theme?.primary === color 
                                ? "0 0 0 2px rgba(0,0,0,0.2)" 
                                : "none",
                        }}
                        onClick={() => handleColorChange(color, "primary")}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>

            <div className="w-full flex flex-col space-y-5">
                {renderColorFields()}
            </div>

            <div className="space-y-4">
                <h3 className="line-clamp-1 text-2xl font-bold">Options</h3>
                <div className="flex items-center gap-5 select-none">
                    <Switch
                        id="hide-icons"
                        checked={resumeData?.hideIcons}
                        className="scale-110"
                        onCheckedChange={(checked) => 
                            handleSwitchChange(checked, "hideIcons")
                        }
                    />
                    <Label className="text-zinc-200" htmlFor="hide-icons">
                        Hide Icons
                    </Label>
                </div>
                <div className="flex items-center gap-5 select-none">
                    <Switch
                        id="underline-links"
                        checked={resumeData?.underlineLinks}
                        className="scale-110"
                        onCheckedChange={(checked) => 
                            handleSwitchChange(checked, "underlineLinks")
                        }
                    />
                    <Label className="text-zinc-200" htmlFor="underline-links">
                        Underline Links
                    </Label>
                </div>
            </div>
        </div>
    );
}