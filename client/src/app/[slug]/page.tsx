import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { GetServerSideProps } from "next";
// // import { PageLoader } from "@/components/editor-components/pageLoader";
// // import { toast } from "sonner";
import Head from "next/head";
import React from "react";

interface UserPortfolioProps {
    portfolioData: GenericTemplateSchema | null;
    templateKey: string | null;
}

const UserPortfolioPage = ({
    portfolioData,
    templateKey,
}: UserPortfolioProps) => {
    React.useEffect(() => {
        if (!portfolioData?.theme || !wrapperRef.current) return;

        const wrapper = wrapperRef.current;
        const toCSSVars = (theme: Record<string, string>) =>
            Object.entries(theme).reduce(
                (acc, [key, value]) => {
                    const cssKey = key.startsWith("--")
                        ? key
                        : `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
                    acc[cssKey] = value;
                    return acc;
                },
                {} as Record<string, string>,
            );

        const cssVars = toCSSVars(portfolioData.theme);

        Object.entries(cssVars).forEach(([key, value]) => {
            wrapper.style.setProperty(key, value);
        });
    }, [portfolioData?.theme]);

    const wrapperRef = React.useRef<HTMLDivElement>(null);

    if (!portfolioData) {
        return <p>Portfolio not found</p>;
    }

    const template = templateKey
        ? TEMPLATE_REGISTRY[templateKey as keyof typeof TEMPLATE_REGISTRY]
        : null;

    if (!template) {
        return <p>Template not found</p>;
    }

    // Apply the theme styles

    return (
        <>
            <Head>
                <title>{portfolioData.name}&apos;s Portfolio</title>
                <meta
                    name="description"
                    content={`Visit ${portfolioData.name}'s portfolio to see their work and projects.`}
                />
                {/* Add other meta tags, OpenGraph tags, etc. */}
            </Head>

            <div ref={wrapperRef} className="theme-wrapper w-full">
                <template.component data={portfolioData} />
            </div>
        </>
    );
};

// SSR: Fetch user data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (!params || typeof params.slug !== "string") {
        return {
            notFound: true,
        };
    }

    const slug = params.slug;

    try {
        const portfolioData = await getUserTemplateData(slug);
        if (!portfolioData || !portfolioData.userTemplateData) {
            return {
                notFound: true,
            };
        }

        const templateKey = portfolioData.userTemplateData.templateKey || null;

        return {
            props: {
                portfolioData: portfolioData.userTemplateData,
                templateKey,
            },
        };
    } catch (err) {
        console.error("Error fetching user portfolio:", err);
        return {
            notFound: true,
        };
    }
};

export default UserPortfolioPage;
