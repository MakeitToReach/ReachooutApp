import { Suspense } from "react";
import { headers } from "next/headers";
import { getProjectBySubdomain, getProjectByCustomDomain } from "@/api/project";
import PortfolioView from "@/components/portfolio/PortfolioView";
// import { notFound } from "next/navigation";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function getProject(subdomain: string) {
  console.log("🔍 getProject function called with subdomain:", subdomain);
  // console.log("🔍 Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    console.log("📡 Making API request to getProjectBySubdomain...");
    const project = await getProjectBySubdomain(subdomain);
    console.log("🔍 Project:", project);
    return project;
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

async function fetchProjectByCustomDomain(hostname: string) {
  console.log(
    "🔍 fetchProjectByCustomDomain function called with hostname:",
    hostname
  );

  try {
    console.log("📡 Making API request to getProjectByCustomDomain...");
    const project = await getProjectByCustomDomain(hostname);

    return project;
  } catch (error) {
    console.error("❌ Error fetching project by custom domain:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

function getSubdomainFromHostname(hostname: string): string | null {
  console.log("🔍 getSubdomainFromHostname called with hostname:", hostname);

  // Handle localhost for development
  if (hostname === "localhost") {
    console.log("  ❌ Hostname is localhost, no subdomain");
    return null;
  }

  // Split hostname by dots
  const parts = hostname.split(".");

  // For localhost:3000 with subdomain (e.g., johndoe.localhost:3000)
  if (hostname.includes("localhost")) {
    if (parts.length >= 2 && parts[1] === "localhost:3000") {
      return parts[0];
    }
    console.log("  ❌ No valid subdomain found in localhost");
    return null;
  }

  // For production domains (e.g., johndoe.reachoout.com)
  if (parts.length > 2) {
    console.log("  ✅ Production subdomain found:", parts[0]);
    return parts[0];
  }

  console.log("  ❌ No subdomain detected");
  return null;
}

function isBaseDomain(hostname: string): boolean {
  return hostname.includes("reachoout.com") || hostname.includes("localhost");
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
        return {
          title: project.name,
          description: `${project.name}'s Portfolio`,
          icons: project.faviconUrl
            ? [{ rel: "icon", url: project.faviconUrl }]
            : "/favicon.ico",
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
        description: `${project.name}'s Portfolio`,
        icons: project.faviconUrl
          ? [{ rel: "icon", url: project.faviconUrl }]
          : "/favicon.ico",
      };
    } catch (error) {
      console.error("Error generating metadata for custom domain:", error);
    }
  }

  // Default metadata for non-subdomain requests
  return {
    title: "Reachoout - Portfolio Platform",
    description: "Create and share your professional portfolio",
    icons: "/favicon.ico",
  };
}

export default async function PortfolioPage() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";

  // Check if this is a reachoout.com subdomain request
  if (isBaseDomain(hostname)) {
    const subdomain = getSubdomainFromHostname(hostname);
    console.log("🔍 Subdomain extraction result:", subdomain);

    if (subdomain) {
      // Check for special subdomains first, before making any API calls
      if (subdomain === "app") {
        console.log("🔄 'app' subdomain detected, redirecting to /home");
        const { redirect } = await import("next/navigation");
        redirect("/home");
      }

      // Only make API request for non-special subdomains
      console.log("📡 Making API request for subdomain:", subdomain);
      const project = await getProject(subdomain);

      if (!project) {
        console.log("❌ Project not found for subdomain:", subdomain);
        notFound();
      }

      console.log("✅ Project found, rendering portfolio");
      return (
        <Suspense fallback={<PageLoader />}>
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
      <Suspense fallback={<PageLoader />}>
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
