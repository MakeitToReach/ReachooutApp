import { Suspense } from "react";
import { headers } from "next/headers";
import { getProjectBySubdomain, getProjectByCustomDomain } from "@/api/project";
import PortfolioView from "@/components/portfolio/PortfolioView";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isBaseDomain, getSubdomainFromHostname } from "@/lib/domainUtils";
import { Loading } from "@/components/editor-components/loading";

async function getProject(subdomain: string) {
  // console.log("🔍 getProject function called with subdomain:", subdomain);

  try {
    const project = await getProjectBySubdomain(subdomain);
    return project;
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return null;
  }
}

async function fetchProjectByCustomDomain(hostname: string) {
  console.log(
    "🔍 fetchProjectByCustomDomain function called with hostname:",
    hostname
  );

  try {
    const project = await getProjectByCustomDomain(hostname);

    return project;
  } catch (error) {
    console.error("❌ Error fetching project by custom domain:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";

  // Handle reachoout.com subdomains
  if (isBaseDomain(hostname)) {
    const subdomain = getSubdomainFromHostname(hostname);

    // Only generate metadata for valid subdomains
    if (subdomain && subdomain !== "app") {
      try {
        const project = await getProject(subdomain);
        console.log("faviconURL", project);
        return {
          title: project.name,
          description: `${project.name}'s Reachoout Portfolio`,
          icons: project.faviconUrl
            ? [{ rel: "icon", url: project.faviconUrl }]
            : undefined,
        };
      } catch (error) {
        console.error("Error generating metadata:", error);
      }
    }
  } else {
    // Handle custom domains
    try {
      const project = await fetchProjectByCustomDomain(hostname);
      return {
        title: project.name,
        description: `${project.name}'s Reachoout Portfolio`,
        icons: project.faviconUrl
          ? [{ rel: "icon", url: project.faviconUrl }]
          : undefined,
      };
    } catch (error) {
      console.error("Error generating metadata for custom domain:", error);
    }
  }

  // Default metadata for non-subdomain requests
  return {
    title: "Reachoout - Portfolio Platform",
    description: "Create and share your professional portfolio",
    icons: undefined,
  };
}

export default async function PortfolioPage() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";

  // Check if this is a reachoout.com subdomain request
  if (isBaseDomain(hostname)) {
    const subdomain = getSubdomainFromHostname(hostname);

    if (subdomain) {
      // Check for special subdomains first, before making any API calls
      if (subdomain === "app") {
        const { redirect } = await import("next/navigation");
        redirect("/home");
      }

      // Only make API request for non-special subdomains
      const project = await getProject(subdomain);

      if (!project) {
        console.log("❌ Project not found for subdomain:", subdomain);
        notFound();
      }

      console.log("✅ Project found, rendering portfolio");
      return (
        <Suspense fallback={<Loading />}>
          <PortfolioView project={project} />
        </Suspense>
      );
    }
  } else {
    // Handle custom domain requests
    console.log("🔍 Custom domain detected:", hostname);
    const project = await fetchProjectByCustomDomain(hostname);

    if (!project) {
      console.log("❌ Project not found for custom domain:", hostname);
      notFound();
    }

    console.log("✅ Project found for custom domain, rendering portfolio");
    return (
      <Suspense fallback={<Loading />}>
        <PortfolioView project={project} />
      </Suspense>
    );
  }

  // If we reach here, no valid subdomain or custom domain was found
  console.log(
    "No valid subdomain or custom domain detected, redirecting to home"
  );
  const { redirect } = await import("next/navigation");
  redirect("/home");
}
