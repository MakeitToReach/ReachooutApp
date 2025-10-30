"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Search,
  Settings,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  getProjectById,
  updateProjectFavicon,
  updateProjectMetaData,
  updateTemplateSEO,
} from "@/api/project";
import { checkSubdomainAvailability, updateSubdomain } from "@/api/domain";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ImageInput } from "@/components/imgInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectSettingsPage = () => {
  const [settings, setSettings] = useState({
    name: "My Portfolio",
    description: "A professional portfolio showcasing my work and experience",
    subDomain: "my-portfolio",
    customDomain: "",
    faviconUrl: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [templates, setTemplates] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templateSEO, setTemplateSEO] = useState({
    slug: "",
    seoTitle: "",
    seoDescription: "",
  });

  const { id } = useParams<{ id: string }>();

  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<
    boolean | null
  >(null);
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Google search preview
  const getGooglePreview = () => {
    const title = settings.name;
    const description = settings.description || "";
    const url = settings.customDomain || `${settings.subDomain}.reachoout.com`;

    return {
      title: title.length > 250 ? title.substring(0, 250) + "..." : title,
      description:
        description.length > 400
          ? description.substring(0, 400) + "..."
          : description,
      url: url,
    };
  };

  const preview = getGooglePreview();

  // Check subdomain availability
  const checkSubdomain = async (subdomain: string) => {
    if (!subdomain || subdomain.length < 3) {
      setIsSubdomainAvailable(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkSubdomainAvailability(subdomain);
      if (response) {
        setIsSubdomainAvailable(response.available);
      } else {
        setIsSubdomainAvailable(false);
      }
    } catch (error) {
      setIsSubdomainAvailable(false);
      console.error("Error checking subdomain availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check slug availability
  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null);
      return;
    }

    const slugRegex = /^[a-z0-9-]+$/;
    const isValid =
      slugRegex.test(slug) && !slug.startsWith("-") && !slug.endsWith("-");
    setIsSlugAvailable(isValid);
  };

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(id);
      setSettings(project);

      if (project.templates && project.templates.length > 0) {
        setTemplates(project.templates);
        const additionalTemplates = project.templates.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (t: any) => t.order > 0,
        );
        if (additionalTemplates.length > 0) {
          setSelectedTemplate(additionalTemplates[0]);
          setTemplateSEO({
            slug: additionalTemplates[0].slug || "",
            seoTitle: additionalTemplates[0].seoTitle || "",
            seoDescription: additionalTemplates[0].seoDescription || "",
          });
        }
      }
    };
    fetchProject();
  }, [id]);

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      if (section === "subdomain") {
        await updateSubdomain(settings.subDomain, id as string);
      } else if (section === "favicon") {
        await updateProjectFavicon(id as string, settings.faviconUrl);
        const updated = await getProjectById(id);
        setSettings({
          ...updated,
          faviconUrl: updated.faviconUrl || "/favicon.ico",
        });

        toast.success("Favicon updated!");
      } else if (section === "basic") {
        await updateProjectMetaData(
          id as string,
          settings.name,
          settings.description,
        );
      } else if (section === "template-seo" && selectedTemplate) {
        const updatedTemplate = await updateTemplateSEO(
          id as string,
          selectedTemplate.templateId,
          templateSEO.slug,
          templateSEO.seoTitle,
          templateSEO.seoDescription,
          selectedTemplate.createdAt,
        );

        //TODO: refactor this shitty code and use react-query please
        setTemplates((prevTemplates) =>
          prevTemplates.map((t) =>
            t.projectId === updatedTemplate.template.projectId &&
            t.templateId === updatedTemplate.template.templateId &&
            t.createdAt === updatedTemplate.template.createdAt
              ? { ...t, ...updatedTemplate.template }
              : t,
          ),
        );

        //eslint-disable-next-line
        setSelectedTemplate((prev: any) =>
          prev &&
          prev.projectId === updatedTemplate.template.projectId &&
          prev.templateId === updatedTemplate.template.templateId &&
          prev.createdAt === updatedTemplate.template.createdAt
            ? { ...prev, ...updatedTemplate.template }
            : prev,
        );

        setTemplateSEO({
          slug: updatedTemplate.template.slug || "",
          seoTitle: updatedTemplate.template.seoTitle || "",
          seoDescription: updatedTemplate.template.seoDescription || "",
        });
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Project Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your project&apos;s basic information, subdomain, and custom
          domain settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Name and Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Update your project&apos;s name and description. These will be
              used in search results and social sharing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-name">Website Name</Label>
              <Input
                id="project-name"
                value={settings.name}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
                placeholder="Enter your project name"
                maxLength={250}
              />
              <p className="text-sm text-muted-foreground">
                {settings.name.length}/250 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Website Description</Label>
              <Textarea
                id="project-description"
                value={settings.description || ""}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                placeholder="Describe your project"
                rows={3}
                maxLength={400}
              />
              <p className="text-sm text-muted-foreground">
                {400}/400 characters
              </p>
            </div>

            <Button
              onClick={() => handleSave("basic")}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Google Search Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Google Search Preview
            </CardTitle>
            <CardDescription>
              This is how your site will appear in Google search results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-white ">
              <div className="space-y-0">
                <div className="text-xl text-blue-800 font-medium">
                  {preview.title}
                </div>
                <div className="text-green-600 text-sm">{preview.url}</div>
                <div className="text-sm line-clamp-2 text-gray-600 dark:text-gray-400">
                  {preview.description}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Subdomain Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Subdomain Settings
            </CardTitle>
            <CardDescription>
              Choose a custom subdomain for your project. This will be your
              project&apos;s URL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="subdomain"
                  value={settings.subDomain}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      subDomain: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  placeholder="your-project"
                  className="flex-1"
                />
                <span className="text-muted-foreground hidden md:block">
                  .reachoout.com
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => checkSubdomain(settings.subDomain)}
                  disabled={isLoading || !settings.subDomain}
                >
                  {isLoading ? "Checking..." : "Check Availability"}
                </Button>
              </div>

              {isSubdomainAvailable !== null && (
                <div className="flex items-center gap-2 mt-2">
                  {isSubdomainAvailable ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Subdomain is available
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Subdomain is not available
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <ExternalLink className="h-3 w-3 mr-1" />
                {settings.subDomain}.reachoout.com
              </Badge>
            </div>

            <Button
              onClick={() => handleSave("subdomain")}
              disabled={isLoading || !isSubdomainAvailable}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Updating..." : "Update Subdomain"}
            </Button>
          </CardContent>
        </Card>

        {/* Section 3: Favicon Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Favicon Settings
            </CardTitle>
            <CardDescription>
              Upload a custom favicon for your project. This will appear in
              browser tabs and bookmarks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="favicon">Project Favicon</Label>
              <ImageInput
                key={settings.faviconUrl}
                initialImgUrl={
                  settings.faviconUrl && settings.faviconUrl.trim() !== ""
                    ? settings.faviconUrl
                    : "/favicon.ico"
                }
                // initialImgUrl={settings.faviconUrl}
                className="w-full"
                onImageUpload={(imgUrl) => {
                  setSettings({ ...settings, faviconUrl: imgUrl });
                }}
                onImageRemove={() => {
                  setSettings({ ...settings, faviconUrl: "" });
                }}
              />
              <p className="text-sm text-muted-foreground">
                Recommended size: 32x32 pixels. Supports SVG, PNG, JPG, or GIF
                (max 2MB).
              </p>
            </div>

            <Button
              onClick={() => handleSave("favicon")}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save Favicon"}
            </Button>
          </CardContent>
        </Card>

        {/* Section 4: Template SEO Settings */}
        {templates.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Additional Page SEO Settings
              </CardTitle>
              <CardDescription>
                Configure SEO settings for additional pages in your portfolio.
                These pages will be accessible via /[slug] URLs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template-select">Select Reachpage</Label>
                <Select
                  value={String(selectedTemplate?.order || "")}
                  onValueChange={(value) => {
                    const template = templates.find(
                      //eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (t: any) => String(t.order) === value,
                    );
                    setSelectedTemplate(template);
                    if (template) {
                      setTemplateSEO({
                        slug: template.slug || "",
                        seoTitle: template.seoTitle || "",
                        seoDescription: template.seoDescription || "",
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template to configure" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .filter((t: any) => t.order > 0)
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map((template: any) => (
                        <SelectItem
                          key={template.order}
                          value={String(template.order)}
                        >
                          Reachpage {template.order + 1}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Page URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="slug"
                        value={templateSEO.slug}
                        onChange={(e) => {
                          const newSlug = e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "");
                          setTemplateSEO({
                            ...templateSEO,
                            slug: newSlug,
                          });
                          checkSlugAvailability(newSlug);
                        }}
                        placeholder="about"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => checkSlugAvailability(templateSEO.slug)}
                        disabled={isLoading || !templateSEO.slug}
                      >
                        {isLoading ? "Checking..." : "Check"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This will be your page URL: {settings.subDomain}
                      .reachoout.com/{templateSEO.slug}
                    </p>
                    {isSlugAvailable !== null && templateSEO.slug && (
                      <div className="flex items-center gap-2 mt-2">
                        {isSlugAvailable ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Valid slug format
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-600">
                              Invalid slug format
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      value={templateSEO.seoTitle}
                      onChange={(e) =>
                        setTemplateSEO({
                          ...templateSEO,
                          seoTitle: e.target.value,
                        })
                      }
                      placeholder="About Me - Professional Portfolio"
                      maxLength={250}
                    />
                    <p className="text-sm text-muted-foreground">
                      {templateSEO.seoTitle.length}/250 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-description">SEO Description</Label>
                    <Textarea
                      id="seo-description"
                      value={templateSEO.seoDescription}
                      onChange={(e) =>
                        setTemplateSEO({
                          ...templateSEO,
                          seoDescription: e.target.value,
                        })
                      }
                      placeholder="Learn more about my background, skills, and experience in web development and design."
                      rows={3}
                      maxLength={400}
                    />
                    <p className="text-sm text-muted-foreground">
                      {templateSEO.seoDescription.length}/400 characters
                    </p>
                  </div>

                  <Button
                    onClick={() => handleSave("template-seo")}
                    disabled={
                      isLoading || !isSlugAvailable || !templateSEO.slug
                    }
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Saving..." : "Save SEO Settings"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Section 4: Custom Domain */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Custom Domain
            </CardTitle>
            <CardDescription>
              Connect your own domain to your project. You&apos;ll need to
              configure DNS settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="custom-domain">Custom Domain</Label>
              <Input
                id="custom-domain"
                value={settings.customDomain}
                onChange={(e) =>
                  setSettings({ ...settings, customDomain: e.target.value })
                }
                placeholder="yourdomain.com"
              />

              {isCustomDomainValid !== null && settings.customDomain && (
                <div className="flex items-center gap-2 mt-2">
                  {isCustomDomainValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Valid domain format
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Invalid domain format
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <Button
              onClick={() => handleSave("custom-domain")}
              disabled={isLoading || !isCustomDomainValid}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Connecting..." : "Connect Domain"}
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
