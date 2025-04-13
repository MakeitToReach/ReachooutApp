import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { cn } from "@/lib/utils"; // for merging Tailwind classes

export type SectionItem = {
    id: string;
    name: string;
};

interface ReorderSectionsDialogProps {
    sections: SectionItem[];
    onReorder: (newOrder: SectionItem[]) => void;
}

export const ReorderSectionsPopup = ({
    sections,
    onReorder,
}: ReorderSectionsDialogProps) => {
    const [items, setItems] = useState(sections);

    const sensors = useSensors(useSensor(PointerSensor));

    //eslint-disable-next-line
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over?.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);
        }
    };

    const handleSave = () => {
        onReorder(items);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Reorder Sections</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Reorder Sections</DialogTitle>
                </DialogHeader>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2 mt-4">
                            {items.map((item) => (
                                <SortableSectionItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost">Cancel</Button>
                    <Button onClick={handleSave} className="cursor-pointer">Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const SortableSectionItem = ({ id, name }: { id: string; name: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm",
                isDragging && "opacity-50",
            )}
        >
            <div className="flex items-center gap-3">
                <span
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-muted-foreground"
                >
                    <GripVertical className="w-5 h-5" />
                </span>
                <span className="font-medium">{name}</span>
            </div>
        </div>
    );
};
