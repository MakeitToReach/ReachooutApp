import { Label } from "@/components/ui/label";
import { PF_STAT } from "@/templates/professional/types/about.types";

interface StatsFieldProps {
  value: PF_STAT[];
  onChange: (val: PF_STAT[]) => void;
}

export const StatsField: React.FC<StatsFieldProps> = ({ value, onChange }) => {
  const handleItemChange = (
    index: number,
    key: keyof PF_STAT,
    newVal: string,
  ) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: newVal };
    onChange(updated);
  };

  // const addStat = () => onChange([...value, { title: "", value: "0" }]);

  // const removeStat = (index: number) => {
  //   const updated = [...value];
  //   updated.splice(index, 1);
  //   onChange(updated);
  // };

  return (
    <div className="space-y-3">
      <Label className="text-lg">Counters</Label>
      {value.map((stat, idx) => (
        <div key={idx} className="flex gap-2 items-end">
          <input
            type="text"
            value={stat.title}
            placeholder="Label"
            onChange={(e) => handleItemChange(idx, "title", e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="number"
            value={stat.value}
            placeholder="Value"
            onChange={(e) => handleItemChange(idx, "value", e.target.value)}
            className="border p-2 rounded w-1/4"
          />
        </div>
      ))}
    </div>
  );
};
