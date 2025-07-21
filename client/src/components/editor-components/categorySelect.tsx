import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { CategoryItem } from "@/types/category.types";

interface CategorySelectProps {
  categoryItems: CategoryItem[];
  placeholder: string;
  onChange: (
    //eslint-disable-next-line
    selectedData: any | GenericTemplateSchema,
    category?: string
  ) => void;
}

export const CategorySelect = ({
  categoryItems,
  placeholder,
  onChange,
}: CategorySelectProps) => {
  return (
    <Select
      onValueChange={(value) => {
        const selectedCategory = categoryItems.find(
          (item) => item.id === value
        );
        if (selectedCategory) {
          onChange(selectedCategory.data, selectedCategory.category);
        }
      }}
      defaultOpen={false}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="z-[100]">
        {categoryItems.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
