import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "View user portfolio",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 