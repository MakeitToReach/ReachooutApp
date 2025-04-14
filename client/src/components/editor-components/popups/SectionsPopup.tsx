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
import { cn } from "@/lib/utils";

interface ReorderSectionsDialogProps {
    sections: { id: string; name: string }[]; // id = section.type
    onReorder: (newOrder: string[]) => void;
}

export const ReorderSectionsPopup = ({
    sections,
    onReorder,
}: ReorderSectionsDialogProps) => {
    const [order, setOrder] = useState(sections.map((s) => s.id));

    const sensors = useSensors(useSensor(PointerSensor));

    //eslint-disable-next-line
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = order.indexOf(active.id);
            const newIndex = order.indexOf(over?.id);
            const newOrder = arrayMove(order, oldIndex, newIndex);
            setOrder(newOrder);
        }
    };

    const handleSave = () => {
        onReorder(order);
    };

    const getSectionName = (id: string) =>
        sections.find((s) => s.id === id)?.name || id;

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
                    <SortableContext items={order} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2 mt-4">
                            {order.map((id) => (
                                <SortableSectionItem
                                    key={id}
                                    id={id}
                                    name={getSectionName(id)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost">Cancel</Button>
                    <Button onClick={handleSave} className="cursor-pointer">
                        Save
                    </Button>
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
