import React from "react";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Label } from "@/components/ui/label";
import { F_STAT } from "../types/stat.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FStatsEditorFieldProps {
    value: F_STAT[];
    onChange: (val: F_STAT[]) => void;
}

export const FStatsEditorField = ({
    value,
    onChange,
}: FStatsEditorFieldProps) => {
    // Ensure we always have exactly 2 stats
    const stats = value.length >= 2 ? value.slice(0, 2) : [
        ...value,
        ...Array(2 - value.length).fill({
            statNumber: "",
            statText: "",
            statDescription: "",
        })
    ];

    const handleStatChange = (index: number, field: keyof F_STAT, value: string) => {
        const updatedStats = [...stats];
        updatedStats[index] = { ...updatedStats[index], [field]: value };
        onChange(updatedStats);
    };

    return (
        <div className="space-y-6">
            <h1 className="font-semibold text-lg">Statistics</h1>
            
            <Accordion type="single" collapsible className="w-full">
                {/* First Stat */}
                <AccordionItem value="stat-1">
                    <AccordionTrigger className="text-base font-medium">
                        Stat 1
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <ReqInput
                                type="text"
                                label="Stat Number"
                                placeholder="e.g., 500+"
                                value={stats[0]?.statNumber || ""}
                                onChange={(e) => handleStatChange(0, "statNumber", e.target.value)}
                            />
                            
                            <ReqInput
                                type="text"
                                label="Stat Text"
                                placeholder="e.g., Happy Clients"
                                value={stats[0]?.statText || ""}
                                onChange={(e) => handleStatChange(0, "statText", e.target.value)}
                            />
                            
                            <div className="space-y-2">
                                <Label className="font-semibold">Stat Description</Label>
                                <textarea
                                    placeholder="Brief description of this statistic"
                                    className="border p-2 w-full rounded-md h-16"
                                    value={stats[0]?.statDescription || ""}
                                    onChange={(e) => handleStatChange(0, "statDescription", e.target.value)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Second Stat */}
                <AccordionItem value="stat-2">
                    <AccordionTrigger className="text-base font-medium">
                        Stat 2
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <ReqInput
                                type="text"
                                label="Stat Number"
                                placeholder="e.g., $10M+"
                                value={stats[1]?.statNumber || ""}
                                onChange={(e) => handleStatChange(1, "statNumber", e.target.value)}
                            />
                            
                            <ReqInput
                                type="text"
                                label="Stat Text"
                                placeholder="e.g., Revenue Generated"
                                value={stats[1]?.statText || ""}
                                onChange={(e) => handleStatChange(1, "statText", e.target.value)}
                            />
                            
                            <div className="space-y-2">
                                <Label className="font-semibold">Stat Description</Label>
                                <textarea
                                    placeholder="Brief description of this statistic"
                                    className="border p-2 w-full rounded-md h-16"
                                    value={stats[1]?.statDescription || ""}
                                    onChange={(e) => handleStatChange(1, "statDescription", e.target.value)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}; 