"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { ReqInput } from "../inputs/reqInput";
import { checkSlugAvailability } from "@/api/templates";
import { cn } from "@/lib/utils";

interface AddSlugPopupProps {
  children: React.ReactNode;
  pid: string;
}

export default function AddSlugPopup({ children, pid }: AddSlugPopupProps) {
  const [slug, setSlug] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(false);
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  const handleExploreTemplates = () => {
    if (slug.trim() && isAvailable) {
      router.push(
        `/explore?pid=${pid}&slug=${encodeURIComponent(slug.trim())}`
      );
      setSlug("");
      setIsAvailable(null);
    }
  };

  const handleCheckAvailability = async () => {
    setChecking(true);
    try {
      const available = await checkSlugAvailability(pid, slug.trim());
      setIsAvailable(available);
    } catch (error) {
      console.error("Error while checking slug availability", error);
      setIsAvailable(false);
    } finally {
      setChecking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleExploreTemplates();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Slug</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            You can add a slug to your project to create a new website.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <ReqInput
            label="Slug"
            placeholder="about"
            value={slug}
            inputClassName={cn(
              isAvailable === false && "border-red-500 focus:border-red-500",
              isAvailable === true && "border-green-500 focus:border-green-500"
            )}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsAvailable(null);
            }}
            onKeyDown={handleKeyPress}
          />
          <Button
            variant="outline"
            onClick={handleCheckAvailability}
            disabled={!slug.trim() || checking}
            className="self-end"
          >
            {checking ? "Checking..." : "Check Availability"}
          </Button>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            onClick={handleExploreTemplates}
            disabled={!slug.trim() || isAvailable !== true}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Explore Templates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
