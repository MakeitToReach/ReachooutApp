export function isBaseDomain(hostname: string): boolean {
  return hostname.includes("reachoout.com") || hostname.includes("localhost");
}

export function getSubdomainFromHostname(hostname: string): string | null {
  // console.log("🔍 getSubdomainFromHostname called with hostname:", hostname);

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
    // console.log("  ❌ No valid subdomain found in localhost");
    return null;
  }

  // For production domains (e.g., johndoe.reachoout.com)
  if (parts.length > 2) {
    // console.log("  ✅ Production subdomain found:", parts[0]);
    return parts[0];
  }

  console.log("  ❌ No subdomain detected");
  return null;
}
