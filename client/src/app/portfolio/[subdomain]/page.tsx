import { Suspense } from "react";
import PortfolioView from "@/components/portfolio/PortfolioView";
import { notFound } from "next/navigation";
import { getProjectBySubdomain } from "@/api/project";

interface PortfolioPageProps {
  params: Promise<{
    subdomain: string;
  }>;
}

async function getProjectFromSubdomain(subdomain: string) {
  try {
    const project = await getProjectBySubdomain(subdomain);
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { subdomain } = await params;
  
  // Fetch project data by subdomain
  const project = await getProjectFromSubdomain(subdomain);
  
  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioView project={project} />
    </Suspense>
  );
} 