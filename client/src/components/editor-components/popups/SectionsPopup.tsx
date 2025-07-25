import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  GripVertical,
  LucideEdit,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";

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
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ReorderSectionsDialogProps {
  children: React.ReactNode;
  sections: { id: string; name: string; isFixed: boolean; isHidden: boolean }[];
  onReorder: (newOrder: string[]) => void;
  onEdit: (tabIdx: number) => void;
  onHide: (sectionType: string) => void;
}

export const ReorderSectionsPopup = ({
  children,
  sections,
  onReorder,
  onEdit,
  onHide,
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
            tabIdx={sections.findIndex((s) => s.id === section.id)}
            onEdit={onEdit}
          />
        );
      } else {
        const reorderedId = order[reorderIndex++];
        const reorderedSection = sections.find((s) => s.id === reorderedId);
        return (
          <SortableSectionItem
            // key={reorderedSection.id}
            // id={reorderedSection.id}
            key={reorderedId}
            id={reorderedId}
            name={reorderedSection!.name}
            isHidden={reorderedSection!.isHidden}
            tabIdx={sections.findIndex((s) => s.id === reorderedSection!.id)}
            onEdit={onEdit}
            toggleHideSection={onHide}
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
    toast.success("Sections reordered successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[100] font-Poppins max-h-[95vh]">
        <ScrollArea className="h-[80vh]">
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
            <SortableContext
              items={order}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 mt-4">{renderSections()}</div>
            </SortableContext>
          </DndContext>

          <div className="flex justify-start gap-2 mt-6">
            <Button onClick={handleSave} className="cursor-pointer">
              Save
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const SortableSectionItem = ({
  id,
  name,
  tabIdx,
  onEdit,
  toggleHideSection,
  isHidden,
}: {
  id: string;
  name: string;
  tabIdx: number;
  onEdit: (tabIdx: number) => void;
  toggleHideSection: (sectionType: string) => void;
  isHidden: boolean;
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
      <div className="flex items-center gap-2">
        <Button onClick={() => toggleHideSection(name)} variant={"outline"}>
          {isHidden ? (
            <span>
              <LucideEyeOff />
            </span>
          ) : (
            <span>
              <LucideEye />
            </span>
          )}
        </Button>
        <DialogClose asChild>
          <Button
            onClick={() => onEdit(tabIdx)}
            variant={"outline"}
            disabled={isHidden}
          >
            Edit{" "}
            <span>
              <LucideEdit />
            </span>
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

const FixedSectionItem = ({
  name,
  tabIdx,
  onEdit,
}: {
  name: string;
  tabIdx: number;
  onEdit: (tabIdx: number) => void;
}) => {
  return (
    <div className="flex relative items-center justify-between p-3 border rounded-lg bg-neutral-100 text-neutral-500">
      <div className="flex items-center gap-3">
        <GripVertical className="w-5 h-5 opacity-30" />
        <span className="font-medium">{name}</span>
      </div>
      <DialogClose asChild className="z-10">
        <Button
          onClick={() => onEdit(tabIdx)}
          className="bg-white text-black border border-border"
          variant={"default"}
        >
          Edit{" "}
          <span>
            <LucideEdit />
          </span>
        </Button>
      </DialogClose>
    </div>
  );
};
