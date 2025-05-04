import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GripVertical, LucideEdit } from "lucide-react";

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
import { DialogDescription } from "@radix-ui/react-dialog";

interface ReorderSectionsDialogProps {
    children: React.ReactNode;
    sections: { id: string; name: string; isFixed: boolean }[];
    onReorder: (newOrder: string[]) => void;
    onEdit: (tabIdx: number) => void;
}

export const ReorderSectionsPopup = ({
    children,
    sections,
    onReorder,
    onEdit,
}: ReorderSectionsDialogProps) => {
    const reorderableIds = sections.filter((s) => !s.isFixed).map((s) => s.id);
    const [order, setOrder] = useState(reorderableIds);

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

    const renderSections = () => {
        let reorderIndex = 0;

        return sections.map((section) => {
            if (section.isFixed) {
                return (
                    <FixedSectionItem
                        key={section.id}
                        name={section.name}
                        // tabIdx={sections.findIndex((s) => s.id === section.id)}
                        // onEdit={onEdit}
                    />
                );
            } else {
                const reorderedId = order[reorderIndex++];
                const reorderedSection = sections.find((s) => s.id === reorderedId);
                return (
                    <SortableSectionItem
                        key={reorderedSection!.id}
                        id={reorderedSection!.id}
                        name={reorderedSection!.name}
                        tabIdx={sections.findIndex((s) => s.id === reorderedSection!.id)}
                        onEdit={onEdit}
                    />
                );
            }
        });
    };

    const handleSave = () => {
        let orderIndex = 0;
        const finalOrder = sections.map((section) => {
            return section.isFixed ? section.id : order[orderIndex++];
        });

        onReorder(finalOrder);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="z-[100] font-Poppins">
                <DialogHeader>
                    <DialogTitle>Reorder Sections</DialogTitle>
                    <DialogDescription>
                        Drag your sections to reorder them
                    </DialogDescription>
                </DialogHeader>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <SortableContext items={order} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2 mt-4">{renderSections()}</div>
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

const SortableSectionItem = ({
    id,
    name,
    tabIdx,
    onEdit,
}: {
    id: string;
    name: string;
    tabIdx: number;
    onEdit: (tabIdx: number) => void;
}) => {
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
                isDragging && "opacity-50 ring-2 ring-blue-500",
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
            <Button onClick={() => onEdit(tabIdx)} variant={"outline"}>
                Edit{" "}
                <span>
                    <LucideEdit />
                </span>
            </Button>
        </div>
    );
};

const FixedSectionItem = ({
    name,
    // tabIdx,
    // onEdit,
}: {
    name: string;
    // tabIdx: number;
    // onEdit: (tabIdx: number) => void;
}) => {
    return (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-neutral-100 text-neutral-500 cursor-not-allowed">
            <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 opacity-30" />
                <span className="font-medium">{name}</span>
            </div>
            <span className="text-xs italic">Fixed</span>

            {/* <Button onClick={() => onEdit(tabIdx)} variant={"outline"}> */}
            {/*     Edit{" "} */}
            {/*     <span> */}
            {/*         <LucideEdit /> */}
            {/*     </span> */}
            {/* </Button> */}
        </div>
    );
};
