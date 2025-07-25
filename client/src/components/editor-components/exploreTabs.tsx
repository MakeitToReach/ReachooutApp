import { CodeXml, UsersRoundIcon, Sparkles, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateCard } from "./templateCard";
import { Skeleton } from "../ui/skeleton";
import { motion as m } from "motion/react";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { Button } from "../ui/button";
import { OnboardingPopup } from "./popups/onboardingPopup";

interface ExploreTabsProps {
  templates: GenericTemplateSchema[];
  projectId?: string;
  slug?: string;
}

export default function ExploreTabs({
  templates,
  projectId,
  slug,
}: ExploreTabsProps) {
  return (
    <Tabs defaultValue="tab-1" className="w-full">
      <ScrollArea>
        <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full">
          <TabsTrigger
            value="tab-1"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xl"
          >
            <Sparkles
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xl"
          >
            <Handshake
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Professional
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xl"
          >
            <CodeXml
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Developer
            <Badge className="ms-1.5">New</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="tab-4"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xl"
          >
            <UsersRoundIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Designer
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <div className="grid md:grid-cols-4 gap-4 px-4">
          {templates.length > 0 ? (
            templates.map((template, idx) => (
              <TemplateCard
                key={idx}
                templateId={template.id}
                imageUrl={template.thumbnailUrl || "/placeholder.png"}
                previewUrl={`/preview/${template.name.toLowerCase()}`}
                editorUrl={"#"}
                showPreview={projectId ? false : true}
                templateName={template.name}
              >
                {projectId && (
                  <OnboardingPopup
                    templateId={template.id}
                    previewUrl={`/editor/${template.name.toLowerCase()}?new&pid=${projectId}&tid=${
                      template.id
                    }&slug=${slug}`}
                  >
                    <Button>Add</Button>
                  </OnboardingPopup>
                )}
              </TemplateCard>
            ))
          ) : (
            <>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-[400px] w-full animate-pulse"
                />
              ))}
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <ComingSoon />
      </TabsContent>
      <TabsContent value="tab-3">
        <ComingSoon />
      </TabsContent>
      <TabsContent value="tab-4">
        <ComingSoon />
      </TabsContent>
    </Tabs>
  );
}

export const ComingSoon = () => {
  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
      <m.h1
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="text-4xl md:text-7xl md:leading-tight font-bold text-center  bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent"
      >
        Coming Soon
      </m.h1>
    </div>
  );
};
