import { Suspense } from "react";
import { headers } from "next/headers";
import { getProjectBySubdomain } from "@/api/project";
import PortfolioView from "@/components/portfolio/PortfolioView";
import { notFound } from "next/navigation";
import { PageLoader } from "@/components/editor-components/pageLoader";

async function getProject(subdomain: string) {
  console.log("🔍 getProject function called with subdomain:", subdomain);
  console.log("🔍 Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    console.log("📡 Making API request to getProjectBySubdomain...");
    const project = await getProjectBySubdomain(subdomain);
    console.log(
      "✅ API request successful, project data:",
      project ? "Found" : "Not found"
    );
    if (project) {
      console.log("📦 Project details:", {
        id: project.id,
        name: project.name,
        subDomain: project.subDomain,
        templatesCount: project.templates?.length || 0,
      });
    }
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
    if (parts[0] === "app") {
      return null;
    }

    console.log("  ✅ Production subdomain found:", parts[0]);
    return parts[0];
  }

  console.log("  ❌ No subdomain detected");
  return null;
}

export default async function PortfolioPage() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";

  // Check if this is a subdomain request
  const subdomain = getSubdomainFromHostname(hostname);
  console.log("🔍 Subdomain extraction result:", subdomain);

  if (subdomain) {
    if (subdomain === "app") {
      const { redirect } = await import("next/navigation");
      redirect("/home");
    }

    const project = await getProject(subdomain);

    if (!project) {
      notFound();
    }

    return (
      <Suspense fallback={<PageLoader />}>
        <PortfolioView project={project} />
      </Suspense>
    );
  }

  console.log("No subdomain detected, redirecting to home");
  const { redirect } = await import("next/navigation");
  redirect("/home");
}
