"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestMultiTenancy() {
  const [subdomain, setSubdomain] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const generateTestUrl = () => {
    if (!subdomain) return;
    
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'localhost:3000' 
      : 'reachoout.com';
    
    const url = `http://${subdomain}.${baseUrl}`;
    setPortfolioUrl(url);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Multi-Tenancy Test</CardTitle>
          <CardDescription>
            Test the subdomain-based portfolio system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="subdomain" className="text-sm font-medium">
              Enter Subdomain:
            </label>
            <div className="flex gap-2">
              <Input
                id="subdomain"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="e.g., john-doe-portfolio"
                className="flex-1"
              />
              <Button onClick={generateTestUrl}>Generate URL</Button>
            </div>
          </div>

          {portfolioUrl && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Portfolio URL:</label>
              <div className="p-3 bg-muted rounded-md">
                <code className="text-sm break-all">{portfolioUrl}</code>
              </div>
              <Button 
                onClick={() => window.open(portfolioUrl, '_blank')}
                className="w-full"
              >
                Open Portfolio
              </Button>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Enter a subdomain that matches a project in your database</li>
              <li>• The system will redirect to the portfolio page</li>
              <li>• If the project doesn&apos;t exist, you&apos;ll see a 404 page</li>
              <li>• In production, this would work with actual subdomains</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 