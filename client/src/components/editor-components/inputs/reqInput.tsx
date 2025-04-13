import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";

interface ReqInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  isOptional?: boolean;
}
export const ReqInput: React.FC<ReqInputProps> = ({
  isRequired,
  label,
  isOptional,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="input-02" className="text-lg font-Montserrat">
          {label}
          {isRequired && <span className="text-red-400">*</span>}
          {isOptional && <span className="text-gray-400"> (optional)</span>}
        </Label>
      )}
      <Input
        id="input-02"
        type="text"
        required
        className="font-Montserrat"
        {...props}
      />
    </div>
  );
};
