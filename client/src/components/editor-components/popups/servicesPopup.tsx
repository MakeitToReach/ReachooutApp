"use client";
import { useEffect, useState } from "react";
import { PF_SERVICES } from "@/templates/professional/types/services";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReqInput } from "../inputs/reqInput";
import { Button } from "@/components/ui/button";
import { IconPicker } from "../inputs/iconPicker";
import { getIconFromRegistry } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface AddServicesPopupProps {
    children: React.ReactNode;
    onAdd: (service: PF_SERVICES) => void;
}
export function AddServicesPopup({ children, onAdd }: AddServicesPopupProps) {
    // const { addProject } = usePortfolioStore();
    const [service, setService] = useState<PF_SERVICES>({
        heading: "",
        description: "",
        icon: "",
    });
    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px] font-Poppins"
                style={{ overflow: "visible" }}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Service</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Heading"
                        placeholder="Enter your service heading"
                        value={service.heading}
                        onChange={(e) =>
                            setService({ ...service, heading: e.target.value })
                        }
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={service.description}
                            onChange={(e) =>
                                setService({ ...service, description: e.target.value })
                            }
                        />
                    </div>

                    <IconPicker
                        onChange={(icon) => {
                            alert(icon);
                            setService({ ...service, icon });
                        }}
                        value={getIconFromRegistry(service.icon)}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(service);
                                setService({
                                    heading: "",
                                    description: "",
                                    icon: "",
                                });
                            }}
                        >
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface EditServicePopupProps {
    service: PF_SERVICES;
    serviceIdx?: number;
    onSave: (updated: PF_SERVICES) => void;
    children: React.ReactNode;
}

export const EditServicePopup = ({
    service,
    serviceIdx,
    onSave,
    children,
}: EditServicePopupProps) => {
    const [formData, setFormData] = useState<PF_SERVICES>(service);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(service); // reset on open
    }, [open, service]);

    const handleChange = (key: keyof PF_SERVICES, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 z-[100] font-Poppins">
                <DialogHeader>
                    <DialogTitle>
                        Edit Service {serviceIdx !== undefined && `#${serviceIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <Label>Title</Label>
                    <ReqInput
                        value={formData.heading}
                        onChange={(e) => handleChange("heading", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={service.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                    <IconPicker
                        onChange={() => { }}
                        value={getIconFromRegistry(formData.icon)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
