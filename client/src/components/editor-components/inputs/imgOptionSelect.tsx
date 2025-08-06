import * as React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

interface ImgOptSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const ImgOptSelect: React.FC<ImgOptSelectProps> = ({
    value,
    onChange,
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="relative z-[70]">
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
            </SelectContent>
        </Select>
    );
};
