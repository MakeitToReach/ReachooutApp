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

interface AddSlugPopupProps {
  children: React.ReactNode;
  pid: string;
}

export default function AddSlugPopup({ children, pid }: AddSlugPopupProps) {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleExploreTemplates = () => {
    if (slug.trim()) {
      router.push(
        `/explore?pid=${pid}&slug=${encodeURIComponent(slug.trim())}`
      );
      setSlug("");
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
            Enter a slug to explore templates with this identifier.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <ReqInput
            label="Slug"
            placeholder="about"
            className="w-full"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            onClick={handleExploreTemplates}
            disabled={!slug.trim()}
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
