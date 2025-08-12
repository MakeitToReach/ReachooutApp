"use client";

import { useEffect } from "react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Check if we're on the correct subdomain
        const hostname = window.location.hostname;
        const port = window.location.port;
        const fullHost = port ? `${hostname}:${port}` : hostname;

        const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
        const isAppSubdomain =
            hostname.startsWith("app.") || fullHost === "app.localhost:3000";

        if (!isAppSubdomain && !isLocalhost) {
            const currentPath = window.location.pathname;
            const currentSearch = window.location.search;
            const currentHash = window.location.hash;

            // Construct the new URL with app subdomain
            const newHostname = hostname.replace(/^([^.]+\.)?/, "app.");
            const newUrl = `${window.location.protocol}//${newHostname}${port ? `:${port}` : ""}${currentPath}${currentSearch}${currentHash}`;

            window.location.href = newUrl;
            return;
        }
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return <>{children}</>;
}
